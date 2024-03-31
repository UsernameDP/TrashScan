# Contains functions that does inference

from ultralytics import YOLO
from PIL import Image, ImageChops
from io import BytesIO
import base64

segment_model = None
material_model = None

MATERIAL_LIST = ['Paper', 'Metal', 'Glass', 'Plastic', 'Wood', 'Trash']

def fit_content(image: Image) -> Image:
    # Get the bounding box of the non-zero content in the image
    bbox = image.getbbox()
    
    # Crop the image to the bounding box
    cropped_image = image.crop(bbox)
    
    # Resize the image to fit the content
    resized_image = cropped_image.resize(cropped_image.size, Image.LANCZOS)
    
    return resized_image

def extract_image_with_mask(mask_image: Image, original_image: Image) -> Image:
    cutout_image = cutout_image.convert('RGB')
    mask_image = mask_image.convert('RGB')

    mask_image = mask_image.resize(original_image.size)

    cutout_image = ImageChops.multiply(original_image, mask_image)
    cutout_image = fit_content(cutout_image)

    return cutout_image


def inference(base64_data : str):
    global segment_model
    
    if not segment_model:
        segment_model = YOLO('yolov8x-seg.pt')
    
    image_bytes = base64.b64decode(base64_data)
    bytes_io = BytesIO(image_bytes)
    original_image: Image = Image.open(bytes_io)

    results = segment_model.predict(original_image)
    masks = results[0].masks



    material_counts = {
        'recycle': {},
        'trash': 0
    }

    items = []

    for mask in masks:
        mask_pixels = mask.data[0].numpy()

        mask_img: Image = Image.fromarray(mask_pixels, "I")

        cropped_image = extract_image_with_mask(mask_img, original_image)

        material = identify_material(cropped_image)

        if material != 'Trash':
            material_counts['trash'] += 1
        else:
            material_counts['recycle'][material] += 1
    
    return {
        'items': items,
        'categorized': material_counts
    }

def identify_material(image: Image) -> str:
    global material_model

    if not material_model:
        material_model = YOLO('yolov8x-cls.pt')

    results = material_model.predict(image)

    category_id = results[0].probs.top1
    conf = results[0].probs.top1conf.item()

    print('Id: ' + category_id + ' Conf: ' + conf)
    if conf > 0.5:
        return MATERIAL_LIST[category_id]
    else:
        return 'Trash'
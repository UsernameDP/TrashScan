from PIL import Image, ImageChops

def fit_content(image):
    # Get the bounding box of the non-zero content in the image
    bbox = image.getbbox()
    
    # Crop the image to the bounding box
    cropped_image = image.crop(bbox)
    
    # Resize the image to fit the content
    resized_image = cropped_image.resize(cropped_image.size, Image.LANCZOS)
    
    return resized_image


original_image = Image.open('cat_dog.jpg')
mask_image = Image.open('dog_mask.png')

mask_image = mask_image.convert('RGB')
mask_image = mask_image.resize(original_image.size)

cutout_image = ImageChops.multiply(original_image, mask_image)

cutout_image = fit_content(cutout_image)

cutout_image.show()
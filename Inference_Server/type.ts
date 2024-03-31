type Vector4 = [number, number, number, number];

enum RecyclableMaterial {
  Paper = "Paper",
  Metal = "Metal",
  Glass = "Glass",
  Plastic = "Plastic",
  // Add more material types as needed
};


enum TrashableMaterial {
  Trash = "Trash"
};

type Material = RecyclableMaterial | TrashableMaterial;


type Item = {
  boundingBox: Vector4,
  material: Material,
  isRecyclable: boolean
};

// This is returned by the Inference server
type Inferences = {
  items: Item[]
};


// Type of the image to be given to the inference server
type Image = {
  data: string, // Base64 representation of the bytes of the image
  width: number,
  height: number,
}
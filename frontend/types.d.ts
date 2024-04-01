enum RecyclableMaterial {
   Paper = "Paper",
   Metal = "Metal",
   Glass = "Glass",
   Plastic = "Plastic",
   Wood = "Wood", 
   // Add more material types as needed
}


enum TrashableMaterial {
   Trash = "Trash"
}


type Material = RecyclableMaterial | TrashableMaterial


type Image = {
   ID : string //id you can query the image from the database
   date : Date //the exact time the image was taken
}


type Vector4 = [number, number, number, number]


type Item = {
   type : Material
}


type ImageItem = Item & {
   location : Vector4 //bounding box on the image
}




// Records the number of recyclable or trash material
type ItemsCategorized = {
   recycle: Record<RecyclableMaterial, number>;
   trash: number;
}


// Type returned by the inference server
type ProcessedImage =  {
   items : ImageItem[]
   categorized :ItemsCategorized
}


type SavedImage =  {
   image : Image
   items : ImageItem[]
   categorized :ItemsCategorized
   cleared : boolean; //whether recycled or not
}


type SavedImagesCategorized = { //cleared and notCleared should be sorted by Image.date
   cleared : SavedImage[];
   notCleared : SavedImage[];
}

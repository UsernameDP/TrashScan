import { Request } from "express";

export interface APIResponse {
    message: "ok" | "error";
    data: any;
}

export type Decoded = {
    id: number,
    username: string
}

export interface TrashRequest extends Request {
    decoded?: Decoded
}

declare namespace TrashTypes {
    enum RecyclableMaterial {
        Paper = "paper",
        Metal = "metal",
        Glass = "glass",
        Plastic = "plastic",
        Wood = "wood"
    }

    enum TrashableMaterial {
        trash = "trash"
    }

    export type Material = RecyclableMaterial | TrashableMaterial;

    export interface Image {
        id: string;
        date: Date;
    }

    export interface Item {
        type: Material;
    }

    export interface ImageItem extends Item {
        location: [number, number, number, number]; // bbox
    }

    export interface CategorizedItems {
        recycle: Record<RecyclableMaterial, number>;
        trash: number;
    }

    export interface ProcessedImage {
        items: ImageItem[];
        categorized: CategorizedItems;
    }

    export interface SavedImage {
        image: Image;
        items: ImageItem[];
        categorized: CategorizedItems;
        cleared: boolean;
    }

    export interface CategorizedSavedImages {
        cleared: SavedImage[];
        uncleared: SavedImage[];
    }
}
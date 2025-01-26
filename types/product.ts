import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

export interface ProductColors {
  [key: string]: string;
}

export interface ProductPart {
  imageUrl: string | StaticImport;
  isNew: any;
  title: ReactNode;
  model: ReactNode;
  features: any;
  specifications: any;
  id: string;
  name: string;
  allowCustomization: boolean;
  position: {
    x: number;
    y: number;
    z: number;
  };
}

export interface Product {
  id: string;
  title: string;
  imagePath: string;
  modelPath: string;
  parts?: ProductPart[];
  tags?: string[];
} 
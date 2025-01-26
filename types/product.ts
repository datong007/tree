export interface ProductColors {
  [key: string]: string;
}

export interface ProductPart {
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
} 
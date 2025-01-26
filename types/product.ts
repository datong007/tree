export interface ProductColors {
  [partId: string]: {
    color: string;
    pantone?: string;
    name: string;
  }
}

export interface ProductPart {
  id: string;
  name: string;
  defaultColor?: string;
  allowCustomization: boolean;
  position: {
    x: number;
    y: number;
    z: number;
  };
} 
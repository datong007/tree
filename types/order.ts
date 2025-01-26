import { ProductColors } from './product';

export interface CustomizationOrder {
  selectedColors: ProductColors;
  quantity: number;
  customerNote?: string;
  contactInfo: {
    name: string;
    email: string;
  };
} 
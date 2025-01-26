export interface CustomizationOrder {
  selectedColors: ProductColors;
  quantity: number;
  customerNote?: string;
  contactInfo: {
    name: string;
    email: string;
  };
} 
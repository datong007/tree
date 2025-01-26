export interface ProductColors {
  [key: string]: string;
}

export interface CustomizationOrder {
  selectedColors: ProductColors;
  size: string;
  quantity: number;
  customerNote?: string;
  contactInfo: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    timestamp: string;
    version: string;
  };
} 
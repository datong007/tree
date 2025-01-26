export interface ProductColors {
  [key: string]: string;
}

export interface ProductPart {
  id: string;
  name: string;
}

export interface ColorOption {
  id: string;
  name: string;
  value: string;
}

export const PRODUCT_PARTS: ProductPart[] = [
  { id: 'body', name: '主体' },
  { id: 'sleeve', name: '袖子' },
  { id: 'collar', name: '领子' },
  { id: 'cuff', name: '袖口' }
];

export const AVAILABLE_COLORS: Record<string, ColorOption[]> = {
  body: [
    { id: 'white', name: '白色', value: '#FFFFFF' },
    { id: 'black', name: '黑色', value: '#000000' },
    { id: 'custom', name: '自定义', value: 'custom' }
  ],
  sleeve: [
    { id: 'white', name: '白色', value: '#FFFFFF' },
    { id: 'black', name: '黑色', value: '#000000' },
    { id: 'custom', name: '自定义', value: 'custom' }
  ],
  collar: [
    { id: 'white', name: '白色', value: '#FFFFFF' },
    { id: 'black', name: '黑色', value: '#000000' },
    { id: 'custom', name: '自定义', value: 'custom' }
  ],
  cuff: [
    { id: 'white', name: '白色', value: '#FFFFFF' },
    { id: 'black', name: '黑色', value: '#000000' },
    { id: 'custom', name: '自定义', value: 'custom' }
  ]
};

export type ProductColors = Record<string, string>; 
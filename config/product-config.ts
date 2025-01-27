export const PRODUCT_CATEGORIES = [
  { id: 'tshirt', name: 'T恤' },
  { id: 'hoodie', name: '卫衣' },
  { id: 'jacket', name: '外套' },
] as const;

export const PRODUCT_STYLES = [
  { id: 'casual', name: '休闲' },
  { id: 'sport', name: '运动' },
  { id: 'business', name: '商务' },
] as const;

export const PRODUCT_SIZES = [
  { id: 'S', name: 'S' },
  { id: 'M', name: 'M' },
  { id: 'L', name: 'L' },
  { id: 'XL', name: 'XL' },
  { id: 'XXL', name: 'XXL' },
] as const; 
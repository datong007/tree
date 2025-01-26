import { ProductPart } from '@/types/product';

export const PRODUCT_PARTS: ProductPart[] = [
  { id: 'part1', name: '前片' },
  { id: 'part2', name: '后片' },
  { id: 'part3', name: '袖子' },
] as const; 
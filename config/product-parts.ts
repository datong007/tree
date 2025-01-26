import { ProductPart } from '@/types/product';

export const PRODUCT_PARTS: ProductPart[] = [
  { id: 'frontButton', name: '前扣' },
  { id: 'cover', name: '盖子' },
  { id: 'mainBody', name: '主体' },
  { id: 'insert', name: '插片' },
  { id: 'logo', name: 'LOGO' },
] as const; 
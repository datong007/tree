import { Category, Filter } from '@/types/filter';

export const CATEGORIES: Category[] = [
  { id: 'all', name: '全部' },
  { id: 'plastic-box', name: 'PLASTIC BOX' },
  { id: 'plastic-accessories', name: 'PLASTIC ACCESSORIES' },
  { id: 'carp', name: 'CARP' },
  { id: 'feeder', name: 'FEEDER' },
  { id: 'metal', name: 'METAL' },
];

export const FILTERS: Filter[] = [
  {
    id: 'brand',
    name: '品牌',
    options: [
      { id: 'brand-a', name: '品牌A' },
      { id: 'brand-b', name: '品牌B' },
      { id: 'brand-c', name: '品牌C' },
    ],
  },
  {
    id: 'isNew',
    name: '新品',
    options: [
      { id: 'true', name: '是' },
      { id: 'false', name: '否' },
    ],
  },
  {
    id: 'isHot',
    name: '热销品',
    options: [
      { id: 'true', name: '是' },
      { id: 'false', name: '否' },
    ],
  },
]; 
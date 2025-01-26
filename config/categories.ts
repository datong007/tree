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
    id: 'style',
    name: '风格',
    options: [
      { id: 'casual', name: '休闲' },
      { id: 'formal', name: '正式' },
      { id: 'sports', name: '运动' },
    ],
  },
  {
    id: 'season',
    name: '季节',
    options: [
      { id: 'spring', name: '春季' },
      { id: 'summer', name: '夏季' },
      { id: 'autumn', name: '秋季' },
      { id: 'winter', name: '冬季' },
    ],
  },
]; 
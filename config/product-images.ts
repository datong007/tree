export interface ProductImage {
  id: string;
  title: string;
  category: string;
  series?: string;
  tags: string[];
  path: string;
  thumbnail: string;
}

export const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 'pb-001',
    title: '大型工具箱',
    category: 'plastic-box',
    series: 'series-a',
    tags: ['工具箱', '收纳箱', '大容量'],
    path: '/images/products/plastic-box/series-a/pb-001.png',
    thumbnail: '/images/products/plastic-box/series-a/pb-001-thumb.png'
  },
  {
    id: 'pb-002',
    title: '中型收纳箱',
    category: 'plastic-box',
    series: 'series-b',
    tags: ['收纳箱', '中型', '轻便'],
    path: '/images/products/plastic-box/series-b/pb-002.png',
    thumbnail: '/images/products/plastic-box/series-b/pb-002-thumb.png'
  },
  // ... 更多产品图片
];

// 搜索函数
export function searchProductImages(query: string): ProductImage[] {
  const searchTerm = query.toLowerCase();
  return PRODUCT_IMAGES.filter(image => 
    image.title.toLowerCase().includes(searchTerm) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// 按分类获取图片
export function getProductImagesByCategory(category: string, series?: string): ProductImage[] {
  return PRODUCT_IMAGES.filter(image => 
    image.category === category &&
    (!series || image.series === series)
  );
} 
// 产品数据类型定义
interface ProductData {
  id: string;           // 产品唯一标识
  title: string;        // 产品标题
  model: string;        // 产品型号
  category: string;     // 产品类别
  series?: string;      // 产品系列
  isNew?: boolean;      // 是否新品
  isHot?: boolean;      // 是否热销
  specifications: {     // 规格参数
    size: string;
    weight: string;
    material: string;
    capacity?: string;
  };
  features: string[];   // 产品特点
  usages: string[];     // 适用场合
  images: {            // 产品图片路径
    overall: string;    // 整体图
    expanded: string;   // 展开图
    model3d?: string;   // 3D模型
  };
}

// 塑料工具箱产品数据
export const PLASTIC_BOX_PRODUCTS: ProductData[] = [
  {
    id: 'pb-a001',
    title: '大型多层工具箱',
    model: 'TB-A001',
    category: 'plastic-box',
    series: 'a-series',
    isNew: true,
    isHot: true,
    specifications: {
      size: '500×300×250mm',
      weight: '2.5kg',
      material: 'PP+ABS',
      capacity: '35L'
    },
    features: [
      '多层收纳设计',
      '防水密封',
      '加强型提手',
      '防撞加厚'
    ],
    usages: [
      '工具收纳',
      '户外装备',
      '维修工具',
      '应急装备'
    ],
    images: {
      overall: '/products/plastic-box/a-series/pb-a001/overall.png',
      expanded: '/products/plastic-box/a-series/pb-a001/expanded.png',
      model3d: '/products/plastic-box/a-series/pb-a001/model.gltf'
    }
  },
  {
    id: 'pb-a002',
    title: '中型工具收纳箱',
    model: 'TB-A002',
    category: 'plastic-box',
    series: 'a-series',
    specifications: {
      size: '400×250×200mm',
      weight: '1.8kg',
      material: 'PP',
      capacity: '20L'
    },
    features: [
      '单层大容量',
      '防水设计',
      '人体工学提手',
      '加厚材质'
    ],
    usages: [
      '工具存储',
      '家用收纳',
      '汽车后备箱',
      '工业用途'
    ],
    images: {
      overall: '/products/plastic-box/a-series/pb-a002/overall.png',
      expanded: '/products/plastic-box/a-series/pb-a002/expanded.png'
    }
  },
  // ... 更多产品
];

// 辅助函数：根据搜索词查找产品
export function findProductsByTitle(searchTerm: string): ProductData[] {
  const term = searchTerm.toLowerCase();
  return PLASTIC_BOX_PRODUCTS.filter(product => 
    product.title.toLowerCase().includes(term) ||
    product.model.toLowerCase().includes(term)
  );
}

// 辅助函数：根据类别和系列获取产品
export function getProductsByCategory(category: string, series?: string): ProductData[] {
  return PLASTIC_BOX_PRODUCTS.filter(product => 
    product.category === category &&
    (!series || product.series === series)
  );
}

// 辅助函数：获取单个产品详情
export function getProductById(productId: string): ProductData | undefined {
  return PLASTIC_BOX_PRODUCTS.find(product => product.id === productId);
}

// 辅助函数：获取新品列表
export function getNewProducts(): ProductData[] {
  return PLASTIC_BOX_PRODUCTS.filter(product => product.isNew);
}

// 辅助函数：获取热销产品列表
export function getHotProducts(): ProductData[] {
  return PLASTIC_BOX_PRODUCTS.filter(product => product.isHot);
} 
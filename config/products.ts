// 产品数据类型定义
interface ProductData {
  id: string;           // 产品唯一标识
  title: string;        // 产品标题
  model: string;        // 产品型号
  brand: string;        // 添加品牌字段
  category: string;     // 产品类别
  series?: string;      // 产品系列
  isNew?: boolean;      // 是否新品
  isHot?: boolean;      // 是否热销
  tags?: string[];      // 产品标签，用于分类和品牌关联
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

// 产品标签定义
export const PRODUCT_TAGS = {
  // 品牌标签
  BRANDS: {
    AZURA: 'azura',
    FLAGMAN: 'flagman',
    VOLZHANKA: 'volzhanka',
    FEEDER: 'feeder',
    ALLVEGA: 'allvega',
  },
  // 类别标签
  CATEGORIES: {
    TOOL_BOX: 'tool-box',
    PLASTIC_BOX: 'plastic-box',
    FISHING_BOX: 'fishing-box',
  },
  // 特性标签
  FEATURES: {
    MULTI_LAYER: 'multi-layer',
    STORAGE: 'storage',
    WATERPROOF: 'waterproof',
  }
} as const;

// 塑料工具箱产品数据
export const PLASTIC_BOX_PRODUCTS: ProductData[] = [
  {
      id: 'pb-a001',
      title: '大型多层工具箱',
      model: 'PB-A001',
      brand: 'AZURA',
      category: 'tool-box',
      series: 'a-series',
      isNew: true,
      tags: ['azura', 'tool-box', 'multi-layer'],
      features: [
          '多层收纳',
          '防水设计',
          '加强提手',
          '防撞加厚'
      ],
      specifications: {
          size: '350×250×150mm',
          weight: '1.2kg',
          material: 'PP+ABS',
          capacity: '13L'
      },
      images: {
          overall: '/products/plastic-box/a-series/pb-a001/overall.jpg',
          expanded: '/products/plastic-box/a-series/pb-a001/expanded.jpg',
          model3d: '/products/plastic-box/a-series/pb-a001/model.glb'
      },
      usages: []
  },
  {
    id: 'pb-a002',
    title: '中型工具收纳箱',
    model: 'TB-A002',
    brand: 'FLAGMAN',
    category: 'plastic-box',
    series: 'a-series',
    tags: ['flagman', 'plastic-box', 'storage'],
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
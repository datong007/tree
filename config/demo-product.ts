// 创建一个演示产品配置文件
export const DEMO_PRODUCT = {
  id: 'pb-a001',
  title: '大型多层工具箱',
  model: 'PB-A001',
  images: {
    overall: '/products/plastic-box/a-series/pb-a001/overall.jpg',    // 本地图片路径
    expanded: '/products/plastic-box/a-series/pb-a001/expanded.jpg',  // 本地图片路径
    model3d: '/products/plastic-box/a-series/pb-a001/model.glb'      // 本地3D模型路径
  },
  specs: {
    size: '350×250×150mm',
    weight: '1.2kg',
    capacity: '13L',
    maxLoad: '15kg'
  },
  materials: {
    body: 'PP',
    handle: 'ABS',
    lock: '尼龙',
    seal: 'TPE'
  },
  description: `
    采用高强度PP+ABS复合材料制造，具有优异的抗冲击性和耐用性。
    多层收纳设计满足不同工具分类存放需求，
    防水密封圈确保内部物品不受潮，
    加强型提手确保大负重搬运安全。
  `
}; 
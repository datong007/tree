// 创建一个演示产品配置文件
export const DEMO_PRODUCT = {
  id: 'pb-a001',
  title: '大型多层工具箱',
  model: 'PB-A001',
  images: {
    overall: '/demo/product-overall.png',    // 修改为演示图片路径
    expanded: '/demo/product-expanded.png',  // 修改为演示图片路径
    model3d: '/demo/product-model.glb'       // 修改为演示3D模型路径
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
  }
}; 
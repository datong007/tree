import React, { useState } from 'react';
import Image from 'next/image';
import { ProductColors } from '@/types/product';

interface ProductImageProps {
  className?: string;
  selectedColors: ProductColors;
}

export default function ProductImage({ 
  className,
  selectedColors 
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.error('Product image failed to load');
  };

  const productInfo = {
    title: "塑料工具箱",
    modelNumber: "PB-2024-A01",
    specifications: [
      { label: "尺寸", value: "350×250×150mm" },
      { label: "重量", value: "1.2kg" },
      { label: "容量", value: "13L" },
      { label: "承重", value: "最大15kg" },
    ],
    materials: [
      "主体材质：PP",
      "把手：ABS",
      "锁扣：尼龙",
      "密封圈：TPE"
    ],
    usages: [
      "工具收纳",
      "户外装备",
      "汽车后备箱",
      "工业用途"
    ]
  };

  if (imageError) {
    return (
      <div className="border rounded-lg p-4 flex items-center justify-center">
        <p className="text-red-500">图片加载失败</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 bg-white">
      {/* 标题和型号 */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{productInfo.title}</h2>
        <p className="text-gray-500 mt-1">型号：{productInfo.modelNumber}</p>
      </div>

      {/* 产品图片 */}
      <div className="relative w-full mb-6" style={{ aspectRatio: '16/9' }}>
        <Image 
          src={`/api/product-image?${new URLSearchParams(Object.fromEntries(Object.entries(selectedColors).map(([key, value]) => [key, value.color])))}`}
          alt="Product View" 
          fill
          className={`object-contain ${className}`}
          onError={handleImageError}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* 产品信息网格 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 规格信息 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">规格参数</h3>
          <div className="space-y-2">
            {productInfo.specifications.map((spec, index) => (
              <div key={index} className="flex text-sm">
                <span className="text-gray-500 w-16">{spec.label}:</span>
                <span className="text-gray-700">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 材质信息 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">材质说明</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {productInfo.materials.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </div>

        {/* 用途信息 */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-2">适用场合</h3>
          <div className="flex flex-wrap gap-2">
            {productInfo.usages.map((usage, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {usage}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
import React, { useState } from 'react';
import Image from 'next/image';
import { ProductColors } from '@/types/product';
import { AppConfig } from '@/config/app-config';

interface ProductImageProps {
  imagePath?: string;
  title?: string;
  selectedColors: ProductColors;
}

export default function ProductImage({ 
  imagePath = AppConfig.product.defaultImagePath,
  title = AppConfig.product.defaultTitle,
  selectedColors 
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  const productSpecs = [
    { label: "尺寸", value: "350×250×150mm" },
    { label: "重量", value: "1.2kg" },
    { label: "容量", value: "13L" },
    { label: "承重", value: "最大15kg" }
  ];

  const productMaterials = [
    { label: "主体", value: "PP" },
    { label: "把手", value: "ABS" },
    { label: "锁扣", value: "尼龙" },
    { label: "密封圈", value: "TPE" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col space-y-6">
        {/* 标题和型号 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">型号：PB-2024-A01</p>
        </div>

        {/* 图片展示 */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          <Image 
            src={imagePath}
            alt={title}
            width={800}
            height={450}
            className="object-contain w-full h-full rounded-lg"
            onError={() => setImageError(true)}
            priority={true}
            unoptimized={true}
          />
          
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">暂无图片</p>
            </div>
          )}
        </div>

        {/* 产品规格和材质信息 */}
        <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
          {/* 规格信息 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">产品规格</h3>
            <div className="space-y-2">
              {productSpecs.map((spec, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{spec.label}</span>
                  <span className="text-gray-900 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 材质信息 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">材质说明</h3>
            <div className="space-y-2">
              {productMaterials.map((material, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{material.label}</span>
                  <span className="text-gray-900 font-medium">{material.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 使用场景 */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">适用场景</h3>
          <div className="flex flex-wrap gap-2">
            {['工具收纳', '户外装备', '汽车后备箱', '工业用途'].map((scene, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {scene}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
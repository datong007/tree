import React, { useState } from 'react';
import Image from 'next/image';
import { ProductColors } from '@/types/product';

interface ExpandedViewProps {
  imagePath: string;
  selectedColors: ProductColors;
}

export default function ExpandedView({ 
  imagePath,
  selectedColors 
}: ExpandedViewProps) {
  const [imageError, setImageError] = useState(false);

  const materialDetails = [
    {
      part: "主体框架",
      material: "PP",
      properties: ["高强度", "耐冲击", "使用寿命长"]
    },
    {
      part: "把手系统",
      material: "ABS",
      properties: ["抗疲劳", "握感舒适", "不易变形"]
    },
    {
      part: "锁扣组件",
      material: "尼龙",
      properties: ["韧性好", "耐磨损", "扣合稳固"]
    },
    {
      part: "密封条",
      material: "TPE",
      properties: ["弹性佳", "防水密封", "耐候性强"]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        {/* 标题区域 */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">展开视图</h2>
          <span className="text-sm text-gray-500">结构分解图</span>
        </div>

        {/* 图片展示区域 */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          <Image 
            src={imagePath}
            alt="展开视图"
            width={800}
            height={450}
            className="object-contain w-full h-full rounded-lg"
            onError={() => setImageError(true)}
            priority={true}
            unoptimized={true}
          />
          
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">暂无展开图</p>
            </div>
          )}
        </div>

        {/* 材质说明区域 */}
        <div className="grid grid-cols-2 gap-6">
          {materialDetails.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">{item.part}</h3>
                <span className="text-sm font-semibold text-blue-600">
                  {item.material}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.properties.map((property, pIndex) => (
                  <span 
                    key={pIndex}
                    className="text-sm text-gray-600 bg-white px-2 py-1 rounded"
                  >
                    {property}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 材质说明注释 */}
        <div className="text-sm text-gray-500 border-t pt-4">
          <p>* 所有材质均通过 RoHS、REACH 等环保认证</p>
          <p>* 产品符合 ISO 9001:2015 质量管理体系要求</p>
        </div>
      </div>
    </div>
  );
} 
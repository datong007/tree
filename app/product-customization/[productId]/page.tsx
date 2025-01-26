'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import ProductImage from '@/components/ProductImage';
import ExpandedView from '@/components/ExpandedView';
import ModelViewer from '@/components/ModelViewer';
import ColorCustomization from '@/components/ColorCustomization';
import CustomizationForm from '@/components/CustomizationForm';
import ChatInterface from '@/components/ChatInterface';
import type { ProductColors } from '@/types/product';
import { DEMO_PRODUCT } from '@/config/demo-product';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const [selectedColors, setSelectedColors] = useState<ProductColors>({});
  const [customPantones, setCustomPantones] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 模拟数据加载
  useState(() => {
    setIsLoading(false);
  });
  // 添加表单提交处理函数
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement order submission
      toast.success('Order submitted successfully');
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    return new FormData();
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 space-y-8">
                <div className="h-96 bg-gray-200 rounded"></div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-4 space-y-8">
                <div className="h-96 bg-gray-200 rounded"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 产品标题区域 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {DEMO_PRODUCT.title}
          </h1>
          <p className="text-lg text-gray-600 mt-2">型号: {DEMO_PRODUCT.model}</p>
        </div>
        
        {/* 整体视图和展开视图区域 */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* 整体视图 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              整体视图
            </h2>
            <div className="relative aspect-[4/3] h-[400px] rounded-lg overflow-hidden">
              <Image
                src={DEMO_PRODUCT.images.overall}
                alt={DEMO_PRODUCT.title}
                fill
                className="object-contain rounded-lg transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={90}
              />
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">产品规格</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(DEMO_PRODUCT.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium text-blue-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">{DEMO_PRODUCT.description}</p>
              </div>
            </div>
          </div>

          {/* 展开视图 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              展开视图
            </h2>
            <div className="relative aspect-[4/3] h-[400px] rounded-lg overflow-hidden">
              <Image
                src={DEMO_PRODUCT.images.expanded}
                alt={`${DEMO_PRODUCT.title} 展开图`}
                fill
                className="object-contain rounded-lg transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={90}
              />
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">组成配件</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(DEMO_PRODUCT.materials).map(([part, material]) => (
                  <div 
                    key={part}
                    className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-lg shadow-sm
                      transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 font-medium">{part}</span>
                      <span className="text-sm text-blue-600">{material}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {part === 'body' && '主体结构件'}
                      {part === 'handle' && '把手组件'}
                      {part === 'lock' && '锁扣机构'}
                      {part === 'seal' && '密封组件'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3D模型和颜色定制区域 */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* 3D模型预览 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              3D模型预览
            </h2>
            <div className="rounded-lg overflow-hidden">
              <ModelViewer
                modelPath={DEMO_PRODUCT.images.model3d}
                selectedColors={selectedColors}
              />
            </div>
          </div>

          {/* 颜色定制 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              颜色定制
            </h2>
            <ColorCustomization
              onColorChange={(partId: string, color: string) => {
                setSelectedColors(prev => ({...prev, [partId]: color}));
              }}
              selectedColors={selectedColors}
              customPantones={customPantones}
              onCustomPantoneChange={(partId: string, value: string) => {
                setCustomPantones(prev => ({...prev, [partId]: value}));
              }}
            />
          </div>
        </div>

        {/* 聊天界面和定制信息表单 */}
        <div className="grid grid-cols-3 gap-8 mt-12">
          {/* 定制信息表单 */}
          <div className="col-span-2">
            <CustomizationForm
              selectedColors={selectedColors}
              onSubmit={handleSubmit}
              customPantones={customPantones}
            />
          </div>
          
          {/* 聊天界面 */}
          <div className="h-[600px]">
            <ChatInterface />
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 
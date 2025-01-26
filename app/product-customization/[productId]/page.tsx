'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import ProductImage from '@/components/ProductImage';
import ExpandedView from '@/components/ExpandedView';
import ModelViewer from '@/components/ModelViewer';
import ColorCustomization from '@/components/ColorCustomization';
import CustomizationForm from '@/components/CustomizationForm';
import type { ProductColors } from '@/types/product';
import { DEMO_PRODUCT } from '@/config/demo-product';
import toast from 'react-hot-toast';

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const [selectedColors, setSelectedColors] = useState<ProductColors>({});
  const [customPantones, setCustomPantones] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // 模拟数据加载
  useState(() => {
    setIsLoading(false);
  });

  // 添加表单提交处理函数
  const handleSubmit = async (formData: any) => {
    try {
      const orderData = {
        productId: params.productId,
        ...formData,
        selectedColors,
        customPantones
      };

      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('提交失败');
      }

      const result = await response.json();
      if (result.success) {
        toast.success('订单提交成功！');
        // 可以添加成功后的处理逻辑
      } else {
        throw new Error(result.error || '提交失败');
      }
    } catch (error) {
      console.error('提交订单时出错:', error);
      toast.error('提交失败，请稍后重试');
    }
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
        {/* 产品标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{DEMO_PRODUCT.title}</h1>
          <p className="text-lg text-gray-600 mt-2">型号: {DEMO_PRODUCT.model}</p>
        </div>
        
        {/* 主要展示区域 */}
        <div className="grid grid-cols-12 gap-8">
          {/* 左侧: 整体照和展开照 */}
          <div className="col-span-8 space-y-8">
            <ProductImage
              imagePath={DEMO_PRODUCT.images.overall}
              title="整体视图"
              selectedColors={selectedColors}
            />
            
            <ExpandedView
              imagePath={DEMO_PRODUCT.images.expanded}
              selectedColors={selectedColors}
            />
          </div>
          
          {/* 右侧: 3D模型和颜色定制 */}
          <div className="col-span-4 space-y-8">
            <ModelViewer
              modelPath={DEMO_PRODUCT.images.model3d}
              selectedColors={selectedColors}
            />
            
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

            <CustomizationForm
              selectedColors={selectedColors}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 
'use client'

import { useState } from 'react'
import ProductImage from '@/components/ProductImage'
import ProductLayout from '@/components/ProductLayout'
import ColorCustomization from '@/components/ColorCustomization'
import CategoryFilter from '@/components/CategoryFilter'
import OrderForm from '@/components/OrderForm'
import ModelViewer from '@/components/ModelViewer'
import ExpandedView from '@/components/ExpandedView'
import { ProductColors } from '@/types/product'
import { CustomizationOrder } from '@/types/order'
import { toast } from 'react-hot-toast' // 需要安装: npm install react-hot-toast
import Link from 'next/link'

export default function ProductCustomizationPage() {
  const [selectedColors, setSelectedColors] = useState<ProductColors>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [customPantones, setCustomPantones] = useState<Record<string, string>>({});

  const handleColorChange = (partName: string, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [partName]: color
    }));
  };

  const handleCustomPantoneChange = (partId: string, value: string) => {
    setCustomPantones(prev => ({
      ...prev,
      [partId]: value
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // 这里可以添加基于分类的产品筛选逻辑
  };

  const handleFilterChange = (filterId: string, optionId: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: optionId
    }));
    // 这里可以添加基于筛选的产品筛选逻辑
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 实现搜索逻辑
  };

  const handleSubmitOrder = async (order: CustomizationOrder) => {
    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '提交失败');
      }

      toast.success('定制信息提交成功！');
      return data;
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('提交失败，请稍后重试');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryFilter 
        onCategoryChange={handleCategoryChange}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* 产品展示区域 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <ProductImage selectedColors={selectedColors} />
          <ModelViewer selectedColors={selectedColors} />
          <ExpandedView selectedColors={selectedColors} />
          <ColorCustomization 
            selectedColors={selectedColors}
            onColorChange={handleColorChange}
            customPantones={customPantones}
            onCustomPantoneChange={handleCustomPantoneChange}
          />
        </div>

        {/* 订单表单区域 */}
        <div className="mt-8 max-w-2xl mx-auto">
          <OrderForm 
            selectedCategory={selectedCategory}
            activeFilters={activeFilters}
            selectedColors={selectedColors}
            onSubmit={handleSubmitOrder}
          />
        </div>
      </div>
    </div>
  );
} 
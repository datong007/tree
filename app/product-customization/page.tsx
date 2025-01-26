'use client'

import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import ProductImage from '@/components/ProductImage'
import ModelViewer from '@/components/ModelViewer'
import ExpandedView from '@/components/ExpandedView'
import ColorCustomization from '@/components/ColorCustomization'
import OrderForm from '@/components/OrderForm'

export default function ProductCustomizationPage() {
  const [selectedColors, setSelectedColors] = useState({});
  const [customPantones, setCustomPantones] = useState({});

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleCategoryChange = (category: string, series?: string) => {
    console.log('Category changed:', category, 'Series:', series);
    // 这里可以根据类目和系列加载相应的产品数据
    if (series) {
      // 处理特定系列的产品
      console.log(`Loading ${series} products from ${category} category`);
    } else {
      // 处理整个类目的产品
      console.log(`Loading all products from ${category} category`);
    }
  };

  const handleFilterChange = (filterId: string, value: string) => {
    console.log('Filter:', filterId, value);
  };

  const handleColorChange = (partId: string, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [partId]: color
    }));
  };

  const handleCustomPantoneChange = (partId: string, pantone: string) => {
    setCustomPantones(prev => ({
      ...prev,
      [partId]: pantone
    }));
  };

  const handleSubmitOrder = async (formData: any) => {
    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('提交失败');
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('提交订单时出错:', error);
      throw error;
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* 搜索栏 */}
        <div className="w-full">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 分类和筛选栏 */}
        <CategoryFilter
          onCategoryChange={handleCategoryChange}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        {/* 整体照片和3D模型栏（并排） */}
        <div className="flex gap-8">
          <div className="w-2/3">
            <ProductImage
              selectedColors={selectedColors}
              className="w-full"
            />
          </div>
          <div className="w-1/3">
            <ModelViewer
              selectedColors={selectedColors}
              className="w-full"
            />
          </div>
        </div>

        {/* 展开图和颜色定制栏（并排） */}
        <div className="flex gap-8">
          <div className="w-2/3">
            <ExpandedView
              selectedColors={selectedColors}
              className="w-full"
            />
          </div>
          <div className="w-1/3">
            <ColorCustomization
              onColorChange={handleColorChange}
              selectedColors={selectedColors}
              customPantones={customPantones}
              onCustomPantoneChange={handleCustomPantoneChange}
            />
          </div>
        </div>

        {/* 提交定制信息栏 */}
        <div className="max-w-2xl mx-auto">
          <OrderForm
            selectedColors={selectedColors}
            onSubmit={handleSubmitOrder}
          />
        </div>
      </div>
    </PageLayout>
  );
} 
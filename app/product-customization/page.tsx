'use client'

import { useState } from 'react'
import ProductImage from '@/components/ProductImage'
import ColorCustomization from '@/components/ColorCustomization'
import CategoryFilter from '@/components/CategoryFilter'
import OrderForm from '@/components/OrderForm'
import ModelViewer from '@/components/ModelViewer'
import ExpandedView from '@/components/ExpandedView'
import { ProductColors } from '@/types/product'
import { CustomizationOrder } from '@/types/order'
import { toast } from 'react-hot-toast' // 需要安装: npm install react-hot-toast
import PageLayout from '@/components/PageLayout'
import ProductLayout from '@/components/ProductLayout'
import SearchBar from '@/components/SearchBar'

export default function ProductCustomizationPage() {
  const [selectedColors, setSelectedColors] = useState<ProductColors>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [customPantones, setCustomPantones] = useState<Record<string, string>>({});
  const handleColorChange = (partName: string, color: { color: string; pantone?: string; name: string }) => {
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
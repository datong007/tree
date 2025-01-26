'use client'

import { useState, useEffect } from 'react'
import { AppConfig } from '@/config/app-config'
import PageLayout from '@/components/PageLayout'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import ProductImage from '@/components/ProductImage'
import ModelViewer from '@/components/ModelViewer'
import ExpandedView from '@/components/ExpandedView'
import ColorCustomization from '@/components/ColorCustomization'
import OrderForm from '@/components/OrderForm'
import { getProductById } from '@/config/products'

export default function ProductCustomizationPage() {
  const [selectedColors, setSelectedColors] = useState({});
  const [customPantones, setCustomPantones] = useState({});
  const [currentProduct, setCurrentProduct] = useState({
    id: 'default',
    title: AppConfig.product.defaultTitle,
    imagePath: AppConfig.product.defaultImagePath,
    modelPath: AppConfig.product.defaultModelPath,
  });

  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // 这里可以根据搜索词更新产品标题
    // 示例：如果搜索词匹配某个产品，则更新标题
    if (query) {
      // 这里应该是实际的产品搜索逻辑
      // 示例仅作演示
      const matchedProduct = findProductByTitle(query);
      if (matchedProduct) {
        setCurrentProduct({
          ...currentProduct,
          id: String(matchedProduct.id), // Convert number to string
          title: matchedProduct.title as typeof AppConfig.product.defaultTitle,
          imagePath: matchedProduct.imagePath as typeof AppConfig.product.defaultImagePath,
          modelPath: matchedProduct.modelPath as typeof AppConfig.product.defaultModelPath,
        });
      }
    }
  };

  const handleCategoryChange = (category: string, series?: string) => {
    console.log('Category:', category, 'Series:', series);
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

  const handleImageSearch = async (file: File) => {
    console.log('Image search:', file);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/image-search', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('图片搜索失败');
      }

      const data = await response.json();
      if (data.products && data.products.length > 0) {
        // 更新搜索结果
        setCurrentProduct({
          ...currentProduct,
          title: data.products[0].title,
          imagePath: data.products[0].imagePath,
          modelPath: data.products[0].modelPath,
        });
      }
    } catch (error) {
      console.error('图片搜索出错:', error);
      // 可以添加错误提示
    }
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <SearchBar 
          onSearch={handleSearch}
          onImageSearch={handleImageSearch}
          placeholder="搜索产品..."
        />

        <CategoryFilter
          onCategoryChange={handleCategoryChange}
          onFilterChange={handleFilterChange}
          onSearch={(query) => console.log('Category search:', query)}
        />

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <ProductImage
              imagePath={currentProduct.imagePath}
              title={currentProduct.title}
              selectedColors={selectedColors}
            />
          </div>
          <div className="col-span-1">
            <ModelViewer
              modelPath={currentProduct.modelPath}
              selectedColors={selectedColors}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <ExpandedView
              imagePath={currentProduct.imagePath}
              selectedColors={selectedColors}
            />
          </div>
          <div className="col-span-1">
            <ColorCustomization
              onColorChange={handleColorChange}
              selectedColors={selectedColors}
              customPantones={customPantones}
              onCustomPantoneChange={handleCustomPantoneChange}
            />
          </div>
        </div>

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

// 示例产品搜索函数
function findProductByTitle(query: string) {
  // 这里应该是实际的产品数据库搜索逻辑
  // 示例数据
  const products = [
    { id: 1, title: "塑料工具箱", imagePath: "/images/default-product.png", modelPath: "/models/default-box.glb" },
    { id: 2, title: "钓鱼箱", imagePath: "/images/default-product.png", modelPath: "/models/default-box.glb" },
    { id: 3, title: "工具收纳盒", imagePath: "/images/default-product.png", modelPath: "/models/default-box.glb" },
    // ... 更多产品
  ];

  return products.find(product => 
    product.title.toLowerCase().includes(query.toLowerCase())
  );
} 
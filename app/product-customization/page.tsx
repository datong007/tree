'use client'

import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import ProductCard from '@/components/ProductCard'
import { PLASTIC_BOX_PRODUCTS } from '@/config/products'

export default function ProductCustomizationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState(PLASTIC_BOX_PRODUCTS)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterProducts(query, selectedCategory)
  }

  const handleImageSearch = async (file: File) => {
    console.log('Image search:', file)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    let filtered = PLASTIC_BOX_PRODUCTS;
    
    if (category !== 'all') {
      filtered = filtered.filter(product => {
        // Check both brand and tags for category matching
        const matchesBrand = product.brand.toLowerCase() === category.toLowerCase();
        const matchesTag = product.tags?.some(tag => tag.toLowerCase() === category.toLowerCase());
        return matchesBrand || matchesTag;
      });
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }

  const handleFilterChange = (filters: any) => {
    console.log('Filters:', filters)
  }

  const filterProducts = (query: string, category: string) => {
    let filtered = PLASTIC_BOX_PRODUCTS
    
    if (query) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.model.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category)
    }

    setFilteredProducts(filtered)
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6 mb-8">
          <SearchBar 
            onSearch={handleSearch}
            onImageSearch={handleImageSearch}
            placeholder="搜索产品..."
          />

          <CategoryFilter
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                title: product.title,
                model: product.model,
                imageUrl: product.images.overall,
                features: product.features || [],
                specifications: product.specifications,
                isNew: product.isNew || false
              }}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">未找到匹配的产品</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
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
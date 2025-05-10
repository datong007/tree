'use client';

import { useState } from 'react';
import { CATEGORIES, FILTERS } from '@/config/categories';
import SearchBar from './SearchBar';

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
  onFilterChange: (filterId: string, optionId: string) => void;
  onSearch: (query: string) => void;
}

export default function CategoryFilter({
  onCategoryChange,
  onFilterChange,
  onSearch
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4">
          {/* 分类选择 */}
          <div className="flex flex-wrap gap-2">
            {['all', 'shirts', 'pants', 'accessories'].map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className="px-4 py-2 rounded-md hover:bg-gray-100"
              >
                {category === 'all' ? '全部' : 
                 category === 'shirts' ? '衬衫' :
                 category === 'pants' ? '裤子' : '配饰'}
              </button>
            ))}
          </div>

          {/* 筛选选项 */}
          <div className="flex gap-4">
            <select
              onChange={(e) => onFilterChange('material', e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">材质</option>
              <option value="cotton">棉质</option>
              <option value="linen">亚麻</option>
              <option value="wool">羊毛</option>
            </select>

            <select
              onChange={(e) => onFilterChange('style', e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">风格</option>
              <option value="casual">休闲</option>
              <option value="business">商务</option>
              <option value="formal">正装</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 
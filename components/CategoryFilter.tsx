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
  onSearch,
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 搜索栏 */}
        <div className="py-4">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* 分类和筛选 */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 space-y-4 sm:space-y-0">
          {/* 分类列表 */}
          <div className="flex space-x-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  onCategoryChange(category.id);
                }}
                className={`text-sm font-medium px-2 py-1 rounded-md transition-colors
                  ${activeCategory === category.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* 筛选按钮组 */}
          <div className="flex space-x-4">
            {FILTERS.map((filter) => (
              <div key={filter.id} className="relative">
                <button
                  onClick={() => setExpandedFilter(
                    expandedFilter === filter.id ? null : filter.id
                  )}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 
                    px-3 py-1 rounded-md border hover:border-blue-600 transition-colors"
                >
                  {filter.name}
                </button>
                
                {/* 下拉选项 */}
                {expandedFilter === filter.id && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      {filter.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            onFilterChange(filter.id, option.id);
                            setExpandedFilter(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { CATEGORIES, FILTERS } from '@/config/categories';
import SearchBar from './SearchBar';

interface CategoryFilterProps {
  onCategoryChange: (category: string, series?: string) => void;
  onFilterChange: (filterType: string, value: string) => void;
  onSearch: (query: string) => void;
}

export default function CategoryFilter({
  onCategoryChange,
  onFilterChange,
  onSearch
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSeries, setActiveSeries] = useState<string | null>(null);

  // 定义系列数据
  const seriesData = {
    'plastic-box': [
      { id: 'series-a', name: 'A系列' },
      { id: 'series-b', name: 'B系列' }
    ]
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setActiveSeries(null);
    onCategoryChange(category);
  };

  const handleSeriesClick = (series: string) => {
    setActiveSeries(series);
    onCategoryChange(activeCategory, series);
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4">
          {/* 主分类选择 */}
          <div className="flex flex-wrap gap-2">
            {['all', 'plastic-box', 'plastic-accessories', 'carp', 'feeder', 'metal'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-md hover:bg-gray-100 ${
                  activeCategory === category ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                {category === 'all' ? '全部' : 
                 category === 'plastic-box' ? 'PLASTIC BOX' :
                 category === 'plastic-accessories' ? 'PLASTIC ACCESSORIES' :
                 category === 'carp' ? 'CARP' :
                 category === 'feeder' ? 'FEEDER' : 'METAL'}
              </button>
            ))}
          </div>

          {/* 系列选择 (仅在 plastic-box 类目下显示) */}
          {activeCategory === 'plastic-box' && (
            <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-gray-200">
              {seriesData['plastic-box'].map((series) => (
                <button
                  key={series.id}
                  onClick={() => handleSeriesClick(series.id)}
                  className={`px-3 py-1 rounded-md text-sm hover:bg-gray-100 ${
                    activeSeries === series.id ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  {series.name}
                </button>
              ))}
            </div>
          )}

          {/* 筛选选项 */}
          <div className="flex gap-4">
            <select
              onChange={(e) => onFilterChange('material', e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">材质</option>
              <option value="pp">PP</option>
              <option value="abs">ABS</option>
              <option value="pc">PC</option>
            </select>

            <select
              onChange={(e) => onFilterChange('style', e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">风格</option>
              <option value="transparent">透明</option>
              <option value="solid">实色</option>
              <option value="metallic">金属色</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 
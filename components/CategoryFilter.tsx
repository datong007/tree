'use client';

import { useState } from 'react';
import { CATEGORIES, FILTERS } from '@/config/categories';
import SearchBar from './SearchBar';

interface CategoryFilterProps {
  onCategoryChange: (category: string, series?: string) => void;
  onFilterChange: (filterId: string, value: string) => void;
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
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex gap-4">
        <select 
          className="px-3 py-2 border rounded-md"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">选择类别</option>
          <option value="plastic-box">塑料工具箱</option>
          <option value="fishing-box">钓鱼箱</option>
        </select>

        <select
          className="px-3 py-2 border rounded-md"
          onChange={(e) => onFilterChange('size', e.target.value)}
        >
          <option value="">选择尺寸</option>
          <option value="small">小型</option>
          <option value="medium">中型</option>
          <option value="large">大型</option>
        </select>
      </div>
    </div>
  );
} 
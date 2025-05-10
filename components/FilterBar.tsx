import React from "react";

interface FilterBarProps {
  selectedFilters: {
    category: string;
    style: string;
    size: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

export default function FilterBar({ selectedFilters, onFilterChange }: FilterBarProps) {
  const categories = ['T恤', '卫衣', '外套'];
  const styles = ['休闲', '运动', '商务'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">类别</label>
        <select
          value={selectedFilters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">全部</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">风格</label>
        <select
          value={selectedFilters.style}
          onChange={(e) => onFilterChange('style', e.target.value)}
          className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">全部</option>
          {styles.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">尺码</label>
        <select
          value={selectedFilters.size}
          onChange={(e) => onFilterChange('size', e.target.value)}
          className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">全部</option>
          {sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );
} 
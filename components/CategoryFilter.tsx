'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/config/categories';

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  onCategoryChange,
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-wrap gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 
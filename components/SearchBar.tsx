'use client';

import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Image from 'next/image';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onImageSearch: (file: File) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  onImageSearch,
  placeholder = "搜索产品..."
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 使用 debounce 防止频繁搜索
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 预览图片
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // 触发图片搜索
      onImageSearch(file);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setPreviewImage(null);
    onSearch('');
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <label className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <span>上传图片</span>
      </label>
    </div>
  );
} 
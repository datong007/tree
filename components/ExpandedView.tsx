import React, { useState } from 'react';
import Image from 'next/image';
import { ProductColors } from '@/types/product';

interface ExpandedViewProps {
  className?: string;
  selectedColors: ProductColors;
}

export default function ExpandedView({ 
  className,
  selectedColors 
}: ExpandedViewProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.error('Expanded view failed to load');
  };

  if (imageError) {
    return (
      <div className="border rounded-lg p-4 flex items-center justify-center">
        <p className="text-red-500">展开图加载失败</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">展开视图</h2>
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <Image 
          src={`/api/product-expanded-view?${new URLSearchParams(selectedColors)}`}
          alt="Expanded View"
          fill
          className={`object-contain ${className}`}
          onError={handleImageError}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
} 
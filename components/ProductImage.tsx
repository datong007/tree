import React, { useState } from 'react';
import Image from 'next/image';
import { ProductColors } from '@/types/product';

interface ProductImageProps {
  className?: string;
  selectedColors: ProductColors;
}

export default function ProductImage({ 
  className,
  selectedColors 
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.error('Product image failed to load');
  };

  if (imageError) {
    return (
      <div className="border rounded-lg p-4 flex items-center justify-center">
        <p className="text-red-500">图片加载失败</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <Image 
          src={`/api/product-image?${new URLSearchParams(selectedColors)}`}
          alt="Product View"
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
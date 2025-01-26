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

  if (imageError) {
    return (
      <div className="border rounded-lg p-4 flex items-center justify-center">
        <p className="text-red-500">图片加载失败</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="relative w-full aspect-square">
        <Image 
          src="/api/product-image"
          alt="Product View"
          fill
          className={`object-contain ${className}`}
          onError={() => setImageError(true)}
          priority
        />
      </div>
    </div>
  );
} 
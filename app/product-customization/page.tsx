'use client'

import { useState } from 'react'
import ProductImage from '@/components/ProductImage'
import ProductLayout from '@/components/ProductLayout'
import ColorCustomization from '@/components/ColorCustomization'
import { ProductColors } from '@/types/product'
import { AVAILABLE_COLORS } from '@/config/colors'

export default function ProductCustomizationPage() {
  const [selectedColors, setSelectedColors] = useState<ProductColors>({});

  const handleColorChange = (partName: string, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [partName]: color
    }));
  };

  return (
    <div className="min-h-screen p-4">
      <ProductLayout>
        <ProductImage 
          className="w-full h-full object-contain"
          selectedColors={selectedColors}
        />
        <ProductLayout.Expanded 
          className="w-full h-full object-contain"
          selectedColors={selectedColors}
        />
        <ColorCustomization 
          onColorChange={handleColorChange}
          selectedColors={selectedColors}
        />
      </ProductLayout>
    </div>
  );
} 
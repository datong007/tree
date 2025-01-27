import { ProductColors } from '@/types/product';
import React from 'react';

interface Model3DViewerProps {
  selectedColors: ProductColors;
}

export default function Model3DViewer({ selectedColors }: Model3DViewerProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">3D 预览</h2>
      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
        <p className="text-gray-500">3D 模型加载中...</p>
      </div>
    </div>
  );
} 
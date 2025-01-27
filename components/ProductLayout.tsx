import Image from 'next/image';
import { ProductColors } from '@/types/product';
import { ReactNode } from 'react';

interface ProductLayoutProps {
  children: ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="container mx-auto px-4">
      {/* 上方3D模型区域 */}
      <div className="mb-8">
        {/* 3D模型内容 */}
      </div>

      {/* 下方三栏布局 */}
      <div className="grid grid-cols-3 gap-8">
        {/* 颜色定制栏 */}
        <div className="col-span-1">
          {/* ColorCustomization component */}
        </div>

        {/* 定制信息栏 */}
        <div className="col-span-1">
          {/* CustomizationForm component */}
        </div>

        {/* 在线咨询栏 */}
        <div className="col-span-1">
          {/* ChatInterface component */}
        </div>
      </div>
    </div>
  );
} 
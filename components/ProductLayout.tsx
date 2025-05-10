import Image from 'next/image';
import { ProductColors } from '@/types/product';
import { ReactNode } from 'react';

interface ProductLayoutProps {
  children: [ReactNode, ReactNode];
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="flex w-full gap-8">
      <div className="w-2/3">
        {/* 左侧内容 */}
        {children[0]}
      </div>
      <div className="w-1/3">
        {/* 右侧内容 */}
        {children[1]}
      </div>
    </div>
  );
} 
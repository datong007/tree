import React from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              产品定制系统
            </Link>
            <Link 
              href="/product-customization" 
              className="text-base text-blue-600 hover:text-blue-700"
            >
              产品列表
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 
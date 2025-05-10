import React from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
}

export default function PageLayout({ children, showBackButton = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            产品定制系统
          </Link>
          {showBackButton && (
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              返回首页
            </Link>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 
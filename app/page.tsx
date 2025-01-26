'use client';

import Link from 'next/link'
import RotatingTitle from '@/components/RotatingTitle'
import StarryBackground from '@/components/StarryBackground'

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 text-center space-y-8">
        <RotatingTitle />
        
        <Link 
          href="/product-customization"
          className="inline-block px-8 py-3 text-lg font-semibold text-white 
            bg-gradient-to-r from-blue-500 to-purple-500 
            rounded-full shadow-lg hover:shadow-xl 
            transform hover:scale-105 transition-all
            animate-pulse hover:animate-none"
        >
          开始定制
        </Link>
      </div>
    </div>
  )
} 
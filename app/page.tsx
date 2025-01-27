'use client';

import Link from 'next/link'
import RotatingTitle from '@/components/RotatingTitle'
import StarryBackground from '@/components/StarryBackground'
import BackgroundMusic from '@/components/BackgroundMusic'
import { FaCube } from 'react-icons/fa'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarryBackground />
      <BackgroundMusic />
      
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <div className={`
          p-2 rounded-full 
          bg-white/10 backdrop-blur-md border border-white/20
          hover:bg-white/20 transition-all duration-300
          text-white shadow-lg hover:shadow-white/20
          group relative
          w-[56px] h-[56px] flex items-center justify-center
        `}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="transform transition-all duration-300 hover:scale-110"
          />
        </div>
      </div>
      
      <div className="relative z-10 text-center space-y-12">
        <RotatingTitle />
        
        <Link 
          href="/product-customization"
          className="inline-block px-12 py-4 text-xl font-bold text-white 
            bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 
            rounded-full shadow-[0_0_30px_rgba(59,130,246,0.5)]
            hover:shadow-[0_0_50px_rgba(59,130,246,0.8)]
            transform hover:scale-110 
            transition-all duration-300 ease-out
            border border-white/20 backdrop-blur-sm
            animate-pulse hover:animate-none
            hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400"
        >
          开始定制
          <span className="ml-2 inline-block transform hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </div>
  )
} 
'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import FadeTransition from '@/components/FadeTransition'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const titles = [
    { text: "产品定制系统", lang: "zh-CN" },
    { text: "Product Customization System", lang: "en-US" },
    { text: "製品カスタマイズシステム", lang: "ja-JP" },
    { text: "제품 커스터마이징 시스템", lang: "ko-KR" },
    { text: "Система настройки продукта", lang: "ru-RU" },
    { text: "System personalizacji produktów", lang: "pl-PL" },
    { text: "Sistema de Personalización de Productos", lang: "es-ES" }
  ];

  // 添加标题轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('播放音乐失败:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 清理效果
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative w-80 h-80 mb-8 rounded-lg overflow-hidden shadow-xl">
        <Image
          src="/assets/welcome.jpg"
          alt="Welcome"
          fill
          className="object-cover transition-transform hover:scale-105 duration-300"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/fallback.jpg';
          }}
        />
      </div>
      
      <div className="h-20 flex items-center justify-center">
        <FadeTransition 
          text={titles[currentTitleIndex].text}
          lang={titles[currentTitleIndex].lang}
        />
      </div>

      <Link 
        href="/product-customization" 
        className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
      >
        开始定制
      </Link>

      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
        aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 15.536A5 5 0 0015 12v-2a4 4 0 00-4-4 4 4 0 00-4 4v2a5 5 0 001.464 3.536m9.072 0a9 9 0 01-12.728 0" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m3.536-10.608a9 9 0 010 14.144m-13.072 0a9 9 0 010-14.144m3.536 10.608a5 5 0 010-7.072" />
          </svg>
        )}
      </button>

      <audio
        ref={audioRef}
        src="/assets/background.mp3"
        loop
      />
    </main>
  )
} 
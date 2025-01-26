'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import RotatingTitle from '@/components/RotatingTitle'
import StarryBackground from '@/components/StarryBackground'

export default function Home() {
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const welcomeTexts = [
    { text: "欢迎使用产品定制系统", lang: "zh" },
    { text: "Welcome to Product Customization", lang: "en" },
    { text: "Bienvenue à la Personnalisation", lang: "fr" },
    { text: "製品カスタマイズへようこそ", lang: "ja" }
  ];

  useEffect(() => {
    // 初始化音频
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 设置音量为50%
      audioRef.current.addEventListener('loadeddata', () => {
        setAudioLoaded(true);
        console.log('Audio loaded successfully');
      });
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
      });
    }

    // 语言切换定时器
    const timer = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % welcomeTexts.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', () => {});
        audioRef.current.removeEventListener('error', () => {});
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current || !audioLoaded) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative">
      <StarryBackground />
      
      <div className="text-center space-y-12 z-10">
        <RotatingTitle />
        <Link 
          href="/product-customization" 
          className="inline-block px-8 py-4 bg-blue-500 text-white rounded-lg 
                   hover:bg-blue-600 transition-all duration-300 
                   transform hover:scale-105 hover:shadow-lg"
        >
          Start
        </Link>
      </div>

      {/* 背景音乐 */}
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
      />

      {/* 音乐控制按钮 */}
      {audioLoaded && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 p-4 bg-white/80 backdrop-blur-sm rounded-full 
                   shadow-lg hover:shadow-xl transition-all duration-300 
                   transform hover:scale-110 z-50"
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
      )}
    </main>
  )
} 
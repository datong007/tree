'use client';

import { useState, useEffect } from 'react';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';
import { IoMusicalNotes } from 'react-icons/io5';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/music/background.mp3');
    audio.loop = true;

    if (isPlaying) {
      audio.play().catch(console.error);
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* 音符装饰 */}
      {isPlaying && (
        <>
          <IoMusicalNotes 
            className="absolute -top-4 -left-4 text-white/60 animate-bounce"
            size={16}
          />
          <IoMusicalNotes 
            className="absolute -top-2 -right-2 text-white/60 animate-bounce delay-100"
            size={12}
          />
        </>
      )}
      
      {/* 主按钮 */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`
          p-4 rounded-full 
          bg-white/10 backdrop-blur-md border border-white/20
          hover:bg-white/20 transition-all duration-300
          text-white shadow-lg hover:shadow-white/20
          group relative
          ${isPlaying ? 'animate-spin-slow' : ''}
        `}
      >
        <FaMusic 
          size={24}
          className={`
            transform transition-all duration-300
            ${isPlaying ? 'scale-110' : 'scale-100'}
          `}
        />
        
        {/* 暂停图标 */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0.5 h-1/2 bg-white/80 rotate-45 transform origin-center" />
          </div>
        )}
      </button>
    </div>
  );
} 
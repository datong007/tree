'use client';

import { useState, useEffect } from 'react';

interface FadeTransitionProps {
  text: string;
  lang: string;
}

export default function FadeTransition({ text, lang }: FadeTransitionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    if (text !== currentText) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setCurrentText(text);
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [text, currentText]);

  return (
    <h1 
      className={`text-4xl font-bold text-gray-800 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      lang={lang}
    >
      {currentText}
    </h1>
  );
} 
import { useState, useEffect } from 'react';

const titles = [
  { text: "欢迎来到产品定制系统", lang: "zh" },
  { text: "Welcome to Product Customization System", lang: "en" },
  { text: "製品カスタマイズシステムへようこそ", lang: "ja" },
  { text: "제품 맞춤 시스템에 오신 것을 환영합니다", lang: "ko" },
  { text: "Добро пожаловать в систему настройки продукта", lang: "ru" },
  { text: "Witamy w Systemie Personalizacji Produktów", lang: "pl" },
  { text: "Willkommen im Produktanpassungssystem", lang: "de" },
  { text: "Bienvenido al Sistema de Personalización de Productos", lang: "es" },
  { text: "Bienvenue dans le Système de Personnalisation de Produits", lang: "fr" },
  { text: "ยินดีต้อนรับสู่ระบบการปรับแต่งผลิตภัณฑ์", lang: "th" },
  { text: "Selamat datang ke Sistem Penyesuaian Produk", lang: "ms" }
];

export default function RotatingTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 
      className={`text-6xl font-bold mb-8 transition-all duration-500
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        bg-clip-text text-transparent bg-gradient-to-r 
        from-blue-400 via-purple-400 to-pink-400
        drop-shadow-[0_0_30px_rgba(191,219,254,0.5)]
        tracking-wide`}
      lang={titles[currentIndex].lang}
    >
      {titles[currentIndex].text}
    </h1>
  );
} 
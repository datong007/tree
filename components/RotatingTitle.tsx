import { useState, useEffect } from 'react';

const titles = [
  { text: "欢迎来到产品定制系统", lang: "zh" },
  { text: "Welcome to Product Customization System", lang: "en" },
  { text: "製品カスタマイズシステムへようこそ", lang: "ja" },
  { text: "제품 맞춤 시스템에 오신 것을 환영합니다", lang: "ko" },
  { text: "Selamat datang ke Sistem Penyesuaian Produk", lang: "ms" },
  { text: "Добро пожаловать в систему настройки продукта", lang: "ru" },
  { text: "Witamy w systemie personalizacji produktów", lang: "pl" },
  { text: "Willkommen beim Produkt-Anpassungssystem", lang: "de" },
  { text: "Bienvenue dans le système de personnalisation de produits", lang: "fr" },
  { text: "Bienvenido al sistema de personalización de productos", lang: "es" }
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
      }, 300);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 
      className={`text-4xl font-bold mb-8 text-gray-800 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      lang={titles[currentIndex].lang}
    >
      {titles[currentIndex].text}
    </h1>
  );
} 
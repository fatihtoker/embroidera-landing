'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-light via-offwhite to-sage-light pt-20">
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <p className="text-terracotta text-lg md:text-xl mb-4 font-lora">{t('greeting')}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-gray-800 mb-6">
            {t('name')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 font-lora">
            {t('tagline')}
          </p>
          <button 
            onClick={scrollToPortfolio}
            className="px-8 py-4 bg-terracotta text-white rounded-full hover:bg-terracotta-dark transition-all hover-scale font-inter"
          >
            {t('cta')}
          </button>
        </div>
      </div>
    </section>
  );
}

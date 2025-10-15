'use client';

import { useTranslations } from 'next-intl';

export default function Portfolio() {
  const t = useTranslations('portfolio');

  const portfolioItems = [
    { key: 'item1', icon: '🏺' },
    { key: 'item2', icon: '🧺' },
    { key: 'item3', icon: '🪢' },
    { key: 'item4', icon: '🪵' },
    { key: 'item5', icon: '🎨' },
    { key: 'item6', icon: '🫖' }
  ];

  return (
    <section id="portfolio" className="py-20 bg-beige-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t('title')}
          </h2>
          <p className="text-terracotta text-lg font-lora">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portfolioItems.map((item) => (
            <div key={item.key} className="group cursor-pointer">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover-scale">
                <div className="aspect-square bg-gradient-to-br from-beige to-sage-light flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{item.icon}</div>
                    <p className="text-gray-500 font-lora text-sm px-4">Image placeholder</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-2">
                    {t(`${item.key}.title`)}
                  </h3>
                  <p className="text-gray-600 font-lora">
                    {t(`${item.key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

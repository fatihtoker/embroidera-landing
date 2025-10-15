'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import WorkshopForm from './WorkshopForm';

export default function Workshops() {
  const t = useTranslations('workshops');
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);

  const workshops = [
    { key: 'workshop1', icon: '🏺' },
    { key: 'workshop2', icon: '🪢' },
    { key: 'workshop3', icon: '🧺' }
  ];

  return (
    <section id="workshops" className="py-20 bg-offwhite">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t('title')}
          </h2>
          <p className="text-terracotta text-lg font-lora mb-6">{t('subtitle')}</p>
          <p className="text-gray-600 max-w-2xl mx-auto font-lora">{t('intro')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {workshops.map((workshop) => (
            <div key={workshop.key} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-sage-light to-beige p-8 text-center">
                <div className="text-6xl mb-4">{workshop.icon}</div>
                <h3 className="text-2xl font-playfair font-semibold text-gray-800">
                  {t(`${workshop.key}.title`)}
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-gray-700 font-lora">
                  {t(`${workshop.key}.description`)}
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-inter">{t(`${workshop.key}.duration`)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-inter">{t(`${workshop.key}.level`)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-inter">{t(`${workshop.key}.date`)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedWorkshop(workshop.key)}
                  className="w-full mt-4 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark transition-colors font-inter"
                >
                  {t('registerButton')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedWorkshop && (
        <WorkshopForm
          workshopKey={selectedWorkshop}
          onClose={() => setSelectedWorkshop(null)}
        />
      )}
    </section>
  );
}

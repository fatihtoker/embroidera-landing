'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-20 bg-offwhite">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t('title')}
          </h2>
          <p className="text-terracotta text-lg font-lora">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo placeholder area */}
          <div className="space-y-4">
            <div className="aspect-square bg-beige rounded-2xl flex items-center justify-center hover-scale">
              <div className="text-center p-8">
                <svg className="w-24 h-24 mx-auto text-terracotta-light mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 font-lora text-sm">Photo of the artist</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed font-lora">
              {t('description')}
            </p>
            <p className="text-gray-700 leading-relaxed font-lora">
              {t('philosophy')}
            </p>
            <p className="text-gray-700 leading-relaxed font-lora">
              {t('experience')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

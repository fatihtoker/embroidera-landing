'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const createContactSchema = (t: any) => z.object({
  name: z.string().min(2, { message: t('validation.nameMin') }),
  email: z.string().email({ message: t('validation.emailInvalid') }),
  subject: z.string().min(1, { message: t('validation.subjectRequired') }),
  message: z.string().min(10, { message: t('validation.messageMin') }),
});

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

export default function Contact() {
  const t = useTranslations();
  const locale = useLocale();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(createContactSchema(t)),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          locale: locale,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      setShowSuccess(true);
      reset();
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert(t('contact.form.errorMessage') || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-beige-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-terracotta text-lg font-lora mb-6">{t('contact.subtitle')}</p>
          <p className="text-gray-600 max-w-2xl mx-auto font-lora">{t('contact.intro')}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {showSuccess && (
              <div className="mb-6 p-4 bg-sage-light border border-sage rounded-lg animate-fade-in">
                <p className="text-sage-dark font-lora text-center">
                  ✓ {t('contact.form.successMessage')}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-inter mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder={t('contact.form.namePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-inter mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-inter mb-2">
                  {t('contact.form.subject')}
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-inter mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark transition-colors font-inter text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contact.form.submitting') || 'Submitting...' : t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

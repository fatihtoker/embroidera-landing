'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const createWorkshopSchema = (t: any) => z.object({
  name: z.string().min(2, { message: t('validation.nameMin') }),
  email: z.string().email({ message: t('validation.emailInvalid') }),
  phone: z.string().min(1, { message: t('validation.phoneRequired') }),
  workshop: z.string().min(1, { message: t('validation.workshopRequired') }),
  date: z.string().min(1, { message: t('validation.dateRequired') }),
  message: z.string().optional(),
});

type WorkshopFormData = z.infer<ReturnType<typeof createWorkshopSchema>>;

export default function WorkshopForm({ workshopKey, onClose }: { workshopKey: string; onClose: () => void }) {
  const t = useTranslations();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<WorkshopFormData>({
    resolver: zodResolver(createWorkshopSchema(t)),
    defaultValues: {
      workshop: t(`workshops.${workshopKey}.title`)
    }
  });

  const onSubmit = (data: WorkshopFormData) => {
    console.log('Workshop registration:', data);
    setShowSuccess(true);
    reset();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-fade-in">
          <div className="text-center">
            <div className="w-16 h-16 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sage-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">
              {t('workshopForm.successTitle')}
            </h3>
            <p className="text-gray-600 font-lora mb-6">
              {t('workshopForm.successMessage')}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark transition-colors font-inter"
            >
              {t('workshopForm.close')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8 animate-fade-in">
        <h3 className="text-3xl font-playfair font-bold text-gray-800 mb-6">
          {t('workshopForm.title')}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-inter mb-2">{t('workshopForm.name')}</label>
            <input
              {...register('name')}
              type="text"
              placeholder={t('workshopForm.namePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-inter mb-2">{t('workshopForm.email')}</label>
            <input
              {...register('email')}
              type="email"
              placeholder={t('workshopForm.emailPlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-inter mb-2">{t('workshopForm.phone')}</label>
            <input
              {...register('phone')}
              type="tel"
              placeholder={t('workshopForm.phonePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-inter mb-2">{t('workshopForm.workshop')}</label>
            <input
              {...register('workshop')}
              type="text"
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-inter mb-2">{t('workshopForm.date')}</label>
            <input
              {...register('date')}
              type="text"
              placeholder={t('workshopForm.datePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-inter mb-2">{t('workshopForm.message')}</label>
            <textarea
              {...register('message')}
              rows={4}
              placeholder={t('workshopForm.messagePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark transition-colors font-inter"
            >
              {t('workshopForm.submit')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-inter"
            >
              {t('workshopForm.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, User } from 'lucide-react';
import type { RegistrationFormData } from '@/lib/supabase/types';

interface ParentInfoStepProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
}

export default function ParentInfoStep({ formData, updateFormData }: ParentInfoStepProps) {
  const t = useTranslations('RegistrationPage.steps.parent_info');

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-8">
        {t('description')}
      </p>

      <div>
        <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
          {t('full_name')} *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="parentName"
            value={formData.parentName}
            onChange={(e) => updateFormData({ parentName: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors"
            placeholder={t('full_name_placeholder')}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-2">
          {t('email')} *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            id="parentEmail"
            value={formData.parentEmail}
            onChange={(e) => updateFormData({ parentEmail: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors"
            placeholder={t('email_placeholder')}
            required
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">{t('email_hint')}</p>
      </div>

      <div>
        <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-2">
          {t('phone')} *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            id="parentPhone"
            value={formData.parentPhone}
            onChange={(e) => updateFormData({ parentPhone: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors"
            placeholder={t('phone_placeholder')}
            required
          />
        </div>
      </div>
    </div>
  );
}

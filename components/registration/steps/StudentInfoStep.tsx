'use client';

import { useTranslations } from 'next-intl';
import { User, Calendar } from 'lucide-react';
import type { RegistrationFormData } from '@/lib/supabase/types';

interface StudentInfoStepProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
}

export default function StudentInfoStep({ formData, updateFormData }: StudentInfoStepProps) {
  const t = useTranslations('RegistrationPage.steps.student_info');

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-8">
        {t('description')}
      </p>

      <div>
        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
          {t('full_name')} *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="studentName"
            value={formData.studentName}
            onChange={(e) => updateFormData({ studentName: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors"
            placeholder={t('full_name_placeholder')}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="studentDateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
          {t('date_of_birth')} *
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            id="studentDateOfBirth"
            value={formData.studentDateOfBirth}
            onChange={(e) => updateFormData({ studentDateOfBirth: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors"
            required
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">{t('date_hint')}</p>
      </div>
    </div>
  );
}

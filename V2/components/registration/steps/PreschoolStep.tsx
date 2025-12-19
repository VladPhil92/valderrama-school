'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import type { RegistrationFormData } from '@/lib/supabase/types';

interface PreschoolStepProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
}

const preschoolLevels = [
  { id: 'nursery' as const, ageRange: '2-3', icon: '🌱' },
  { id: 'maternal' as const, ageRange: '3-4', icon: '🌿' },
  { id: 'prekinder' as const, ageRange: '4-5', icon: '🌳' },
  { id: 'kinder' as const, ageRange: '5-6', icon: '🎓' },
];

export default function PreschoolStep({ formData, updateFormData }: PreschoolStepProps) {
  const t = useTranslations('RegistrationPage.steps.preschool');

  return (
    <div className="space-y-8">
      <p className="text-gray-600 text-center">
        {t('description')}
      </p>

      {/* Level Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('level_title')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preschoolLevels.map((level) => {
            const isSelected = formData.preschoolLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => updateFormData({ preschoolLevel: level.id })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-[#C41E3A] bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{level.icon}</span>
                  {isSelected && (
                    <Check className="w-5 h-5 text-[#C41E3A]" />
                  )}
                </div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {t(`levels.${level.id}`)}
                </h4>
                <p className="text-sm text-gray-500">
                  {t('age_range', { range: level.ageRange })}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-2">
          {t('schedule_info_title')}
        </h4>
        <p className="text-gray-600">
          {t('schedule_info')}
        </p>
      </div>

      {/* Methodology Info */}
      <div className="bg-[#C41E3A]/5 rounded-lg p-6 border border-[#C41E3A]/20">
        <h4 className="font-medium text-[#C41E3A] mb-2">
          {t('methodology_title')}
        </h4>
        <p className="text-gray-600 text-sm">
          {t('methodology_info')}
        </p>
      </div>
    </div>
  );
}

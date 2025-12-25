'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, BookOpen, Sparkles } from 'lucide-react';
import type { RegistrationFormData } from '@/lib/supabase/types';

interface ServiceSelectionStepProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
}

export default function ServiceSelectionStep({ formData, updateFormData }: ServiceSelectionStepProps) {
  const t = useTranslations('RegistrationPage.steps.service_selection');

  const services = [
    {
      id: 'preschool' as const,
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'bg-[#C41E3A]',
    },
    {
      id: 'learning_center' as const,
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-[#1F2A44]',
    },
    {
      id: 'both' as const,
      icon: <Sparkles className="w-8 h-8" />,
      color: 'bg-[#0F766E]',
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-8">
        {t('description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => updateFormData({ serviceType: service.id })}
            className={`p-6 rounded-xl border-2 transition-all ${
              formData.serviceType === service.id
                ? 'border-[#C41E3A] bg-red-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
              {service.icon}
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              {t(`options.${service.id}.title`)}
            </h3>
            <p className="text-sm text-gray-500">
              {t(`options.${service.id}.description`)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

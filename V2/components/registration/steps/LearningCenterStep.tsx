'use client';

import { useTranslations } from 'next-intl';
import { Check, Clock } from 'lucide-react';
import type { RegistrationFormData } from '@/lib/supabase/types';

interface LearningCenterStepProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
}

const subjects = [
  { id: 'math', icon: '📐' },
  { id: 'english', icon: '🇬🇧' },
  { id: 'spanish', icon: '📚' },
  { id: 'sciences', icon: '🔬' },
  { id: 'social_sciences', icon: '🌍' },
  { id: 'economics', icon: '📊' },
  { id: 'philosophy', icon: '💭' },
  { id: 'ethics_leadership', icon: '🎯' },
];

const intensityOptions = [
  { hours: 4, sessions: 2 },
  { hours: 6, sessions: 3 },
  { hours: 8, sessions: 4 },
  { hours: 10, sessions: 5 },
];

export default function LearningCenterStep({ formData, updateFormData }: LearningCenterStepProps) {
  const t = useTranslations('RegistrationPage.steps.learning_center');

  const toggleSubject = (subjectId: string) => {
    const current = formData.selectedSubjects;
    const updated = current.includes(subjectId)
      ? current.filter(s => s !== subjectId)
      : [...current, subjectId];
    updateFormData({ selectedSubjects: updated });
  };

  return (
    <div className="space-y-8">
      <p className="text-gray-600 text-center">
        {t('description')}
      </p>

      {/* Subject Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('subjects_title')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {subjects.map((subject) => {
            const isSelected = formData.selectedSubjects.includes(subject.id);
            return (
              <button
                key={subject.id}
                type="button"
                onClick={() => toggleSubject(subject.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-[#C41E3A] bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{subject.icon}</span>
                  {isSelected && (
                    <Check className="w-5 h-5 text-[#C41E3A]" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {t(`subjects.${subject.id}`)}
                </span>
              </button>
            );
          })}
        </div>
        {formData.selectedSubjects.length === 0 && (
          <p className="mt-2 text-sm text-amber-600">
            {t('select_at_least_one')}
          </p>
        )}
      </div>

      {/* Intensity Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('intensity_title')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {intensityOptions.map((option) => {
            const isSelected = formData.intensityHoursPerWeek === option.hours;
            return (
              <button
                key={option.hours}
                type="button"
                onClick={() => updateFormData({ intensityHoursPerWeek: option.hours })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-[#C41E3A] bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <Clock className={`w-6 h-6 ${isSelected ? 'text-[#C41E3A]' : 'text-gray-400'}`} />
                </div>
                <div className="text-center">
                  <span className="block text-lg font-bold text-gray-900">
                    {option.hours}h
                  </span>
                  <span className="text-xs text-gray-500">
                    {t('sessions_per_week', { count: option.sessions })}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule Preference */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('schedule_title')}
        </h3>
        <textarea
          value={formData.preferredSchedule}
          onChange={(e) => updateFormData({ preferredSchedule: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors resize-none"
          rows={3}
          placeholder={t('schedule_placeholder')}
        />
        <p className="mt-1 text-sm text-gray-500">
          {t('schedule_hint')}
        </p>
      </div>
    </div>
  );
}

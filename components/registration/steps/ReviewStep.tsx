'use client';

import { useTranslations } from 'next-intl';
import { User, Users, BookOpen, GraduationCap, FileText, Check } from 'lucide-react';
import type { RegistrationFormData } from '@/lib/supabase/types';

interface ReviewStepProps {
  formData: RegistrationFormData;
}

export default function ReviewStep({ formData }: ReviewStepProps) {
  const t = useTranslations('RegistrationPage.steps.review');
  const tSubjects = useTranslations('RegistrationPage.steps.learning_center.subjects');
  const tLevels = useTranslations('RegistrationPage.steps.preschool.levels');
  const tDocTypes = useTranslations('RegistrationPage.steps.documents.types');

  const showLearningCenter = formData.serviceType === 'learning_center' || formData.serviceType === 'both';
  const showPreschool = formData.serviceType === 'preschool' || formData.serviceType === 'both';

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-8">
        {t('description')}
      </p>

      {/* Parent Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-[#C41E3A]" />
          <h3 className="font-medium text-gray-900">{t('parent_info')}</h3>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-500">{t('name')}</dt>
            <dd className="font-medium text-gray-900">{formData.parentName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">{t('email')}</dt>
            <dd className="font-medium text-gray-900">{formData.parentEmail}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">{t('phone')}</dt>
            <dd className="font-medium text-gray-900">{formData.parentPhone}</dd>
          </div>
        </dl>
      </div>

      {/* Student Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#1F2A44]" />
          <h3 className="font-medium text-gray-900">{t('student_info')}</h3>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-500">{t('name')}</dt>
            <dd className="font-medium text-gray-900">{formData.studentName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">{t('date_of_birth')}</dt>
            <dd className="font-medium text-gray-900">
              {new Date(formData.studentDateOfBirth).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>

      {/* Learning Center */}
      {showLearningCenter && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#0F766E]" />
            <h3 className="font-medium text-gray-900">{t('learning_center')}</h3>
          </div>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-500 mb-2">{t('subjects')}</dt>
              <dd className="flex flex-wrap gap-2">
                {formData.selectedSubjects.map(subject => (
                  <span
                    key={subject}
                    className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] rounded-full text-sm"
                  >
                    {tSubjects(subject)}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">{t('intensity')}</dt>
              <dd className="font-medium text-gray-900">
                {formData.intensityHoursPerWeek} {t('hours_per_week')}
              </dd>
            </div>
            {formData.preferredSchedule && (
              <div>
                <dt className="text-sm text-gray-500">{t('schedule_preference')}</dt>
                <dd className="text-gray-900">{formData.preferredSchedule}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Preschool */}
      {showPreschool && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-[#C41E3A]" />
            <h3 className="font-medium text-gray-900">{t('preschool')}</h3>
          </div>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-500">{t('level')}</dt>
              <dd className="font-medium text-gray-900">
                {tLevels(formData.preschoolLevel)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 mb-2">{t('documents')}</dt>
              <dd className="space-y-2">
                {formData.documents.map(doc => (
                  <div key={doc.type} className="flex items-center gap-2">
                    {doc.file ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <FileText className="w-4 h-4 text-gray-300" />
                    )}
                    <span className={doc.file ? 'text-gray-900' : 'text-gray-400'}>
                      {tDocTypes(doc.type)}
                    </span>
                    {doc.file && (
                      <span className="text-xs text-gray-500">
                        ({doc.file.name})
                      </span>
                    )}
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* Terms */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          {t('terms_notice')}
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronRight, ChevronLeft, Check, User, Users, BookOpen, FileText, ClipboardCheck } from 'lucide-react';
import ParentInfoStep from './steps/ParentInfoStep';
import StudentInfoStep from './steps/StudentInfoStep';
import ServiceSelectionStep from './steps/ServiceSelectionStep';
import LearningCenterStep from './steps/LearningCenterStep';
import PreschoolStep from './steps/PreschoolStep';
import DocumentsStep from './steps/DocumentsStep';
import ReviewStep from './steps/ReviewStep';
import type { RegistrationFormData } from '@/lib/supabase/types';

const initialFormData: RegistrationFormData = {
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  studentName: '',
  studentDateOfBirth: '',
  serviceType: 'preschool',
  selectedSubjects: [],
  intensityHoursPerWeek: 4,
  preferredSchedule: '',
  preschoolLevel: 'kinder',
  documents: [
    { type: 'birth_certificate', file: null },
    { type: 'vaccination_card', file: null },
    { type: 'photo', file: null },
    { type: 'previous_records', file: null },
  ],
};

type Step = {
  id: string;
  icon: React.ReactNode;
  condition?: (data: RegistrationFormData) => boolean;
};

export default function RegistrationForm() {
  const t = useTranslations('RegistrationPage');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allSteps: Step[] = [
    { id: 'parent_info', icon: <User className="w-5 h-5" /> },
    { id: 'student_info', icon: <Users className="w-5 h-5" /> },
    { id: 'service_selection', icon: <BookOpen className="w-5 h-5" /> },
    { 
      id: 'learning_center', 
      icon: <BookOpen className="w-5 h-5" />,
      condition: (data) => data.serviceType === 'learning_center' || data.serviceType === 'both'
    },
    { 
      id: 'preschool', 
      icon: <Users className="w-5 h-5" />,
      condition: (data) => data.serviceType === 'preschool' || data.serviceType === 'both'
    },
    { 
      id: 'documents', 
      icon: <FileText className="w-5 h-5" />,
      condition: (data) => data.serviceType === 'preschool' || data.serviceType === 'both'
    },
    { id: 'review', icon: <ClipboardCheck className="w-5 h-5" /> },
  ];

  const activeSteps = allSteps.filter(step => !step.condition || step.condition(formData));
  const currentStepData = activeSteps[currentStep];
  const totalSteps = activeSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateFormData = (updates: Partial<RegistrationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent: {
            full_name: formData.parentName,
            email: formData.parentEmail,
            phone: formData.parentPhone,
          },
          student: {
            full_name: formData.studentName,
            date_of_birth: formData.studentDateOfBirth,
          },
          application: {
            application_type: formData.serviceType,
            preschool_level: formData.serviceType !== 'learning_center' ? formData.preschoolLevel : null,
          },
          learning_center: formData.serviceType !== 'preschool' ? {
            subjects: formData.selectedSubjects,
            intensity_hours_per_week: formData.intensityHoursPerWeek,
            preferred_schedule: formData.preferredSchedule,
          } : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          {t('success.title')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('success.message')}
        </p>
        <p className="text-sm text-gray-500">
          {t('success.email_sent', { email: formData.parentEmail })}
        </p>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStepData?.id) {
      case 'parent_info':
        return <ParentInfoStep formData={formData} updateFormData={updateFormData} />;
      case 'student_info':
        return <StudentInfoStep formData={formData} updateFormData={updateFormData} />;
      case 'service_selection':
        return <ServiceSelectionStep formData={formData} updateFormData={updateFormData} />;
      case 'learning_center':
        return <LearningCenterStep formData={formData} updateFormData={updateFormData} />;
      case 'preschool':
        return <PreschoolStep formData={formData} updateFormData={updateFormData} />;
      case 'documents':
        return <DocumentsStep formData={formData} updateFormData={updateFormData} />;
      case 'review':
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {t('step_of', { current: currentStep + 1, total: totalSteps })}
          </span>
          <span className="text-sm font-medium text-[#C41E3A]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#C41E3A] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {activeSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              index === currentStep
                ? 'bg-[#C41E3A] text-white'
                : index < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {index < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              step.icon
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <h2 className="text-2xl font-medium text-center text-gray-900 mb-8">
        {t(`steps.${currentStepData?.id}.title`)}
      </h2>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        {renderStep()}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          {t('back')}
        </button>

        {currentStep === totalSteps - 1 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-[#C41E3A] text-white rounded-lg font-medium hover:bg-[#A01830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('submitting') : t('submit')}
            <Check className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-[#C41E3A] text-white rounded-lg font-medium hover:bg-[#A01830] transition-colors"
          >
            {t('next')}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

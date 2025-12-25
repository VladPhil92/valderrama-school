'use client';

import { useState } from 'react';
import { ArrowLeft, School, Lightbulb, X, AlertTriangle, Home, ChevronRight } from 'lucide-react';
import SchoolAdmissionForm from './admissions/SchoolAdmissionForm';
import { LearningCenterAdmissionForm } from './admissions/LearningCenterForm';

interface AdmissionFormSelectorProps {
  locale: string;
}

interface ExitConfirmationModalProps {
  t: {
    exitConfirmation: {
      title: string;
      message: string;
      stay: string;
      exit: string;
    };
  };
  onCancel: () => void;
  onConfirm: () => void;
}

// Exit Confirmation Modal - moved outside main component
function ExitConfirmationModal({ t, onCancel, onConfirm }: ExitConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>
        
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7 text-amber-600" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
          {t.exitConfirmation.title}
        </h3>
        <p className="text-slate-600 text-center text-sm mb-6">
          {t.exitConfirmation.message}
        </p>
        
        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onCancel}
            className="w-full py-3 px-6 bg-[#C41E3A] text-white rounded-lg font-medium hover:bg-[#9B1B30] transition-colors"
          >
            {t.exitConfirmation.stay}
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-3 px-6 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
          >
            {t.exitConfirmation.exit}
          </button>
        </div>
      </div>
    </div>
  );
}

interface FormHeaderProps {
  formType: 'school' | 'learning-center';
  locale: string;
  isSpanish: boolean;
  t: {
    school: { title: string; subtitle: string };
    learningCenter: { title: string; subtitle: string };
    backButton: string;
    breadcrumb: {
      home: string;
      admissions: string;
      school: string;
      learningCenter: string;
    };
  };
  onBackClick: () => void;
}

// Form Header - moved outside main component
function FormHeader({ formType, locale, isSpanish, t, onBackClick }: FormHeaderProps) {
  const isSchool = formType === 'school';
  const accentColor = isSchool ? '#C41E3A' : '#B45309';
  const Icon = isSchool ? School : Lightbulb;
  const formTitle = isSchool ? t.school.title : t.learningCenter.title;
  const formSubtitle = isSchool ? t.school.subtitle : t.learningCenter.subtitle;
  const breadcrumbLabel = isSchool ? t.breadcrumb.school : t.breadcrumb.learningCenter;

  return (
    <div className="mb-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <a href={`/${locale}`} className="flex items-center gap-1 hover:text-slate-700 transition-colors">
          <Home size={14} />
          <span>{t.breadcrumb.home}</span>
        </a>
        <ChevronRight size={14} className="text-slate-300" />
        <button 
          onClick={onBackClick}
          className="hover:text-slate-700 transition-colors"
        >
          {t.breadcrumb.admissions}
        </button>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-slate-900 font-medium">{breadcrumbLabel}</span>
      </nav>

      {/* Form Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button
            onClick={onBackClick}
            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
            title={t.backButton}
          >
            <ArrowLeft size={20} />
          </button>
          
          {/* Form Icon & Title */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">{formTitle}</h2>
              <p className="text-xs text-slate-500">{formSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Change Form Button */}
        <button
          onClick={onBackClick}
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all"
        >
          <span>{isSpanish ? 'Cambiar formulario' : 'Change form'}</span>
        </button>
      </div>
    </div>
  );
}

export default function AdmissionFormSelector({ locale }: AdmissionFormSelectorProps) {
  const [selectedForm, setSelectedForm] = useState<'none' | 'school' | 'learning-center'>('none');
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const isSpanish = locale === 'es';

  // Translation object
  const t = {
    title: isSpanish ? 'Seleccione el tipo de inscripción' : 'Select enrollment type',
    subtitle: isSpanish 
      ? 'Elija el formulario que corresponda a sus necesidades' 
      : 'Choose the form that matches your needs',
    school: {
      title: isSpanish ? 'Admisión Escolar' : 'School Admission',
      subtitle: isSpanish ? 'Preescolar (Nursery - Kinder)' : 'Preschool (Nursery - Kinder)',
      description: isSpanish 
        ? 'Para familias que desean inscribir a sus hijos en nuestro programa preescolar bilingüe de tiempo completo.'
        : 'For families looking to enroll their children in our full-time bilingual preschool program.',
      features: isSpanish 
        ? ['Educación bilingüe', 'Programa completo', 'Nursery a Kinder']
        : ['Bilingual education', 'Full-time program', 'Nursery to Kinder'],
    },
    learningCenter: {
      title: isSpanish ? 'Centro de Aprendizaje' : 'Learning Center',
      subtitle: isSpanish ? 'Tutorías y Cursos' : 'Tutoring & Courses',
      description: isSpanish 
        ? 'Para estudiantes que buscan refuerzo académico, idiomas, música, arte o deportes.'
        : 'For students seeking academic tutoring, languages, music, art, or sports programs.',
      features: isSpanish 
        ? ['Tutorías académicas', 'Idiomas y música', 'Arte y deportes']
        : ['Academic tutoring', 'Languages & music', 'Art & sports'],
    },
    selectButton: isSpanish ? 'Seleccionar' : 'Select',
    backButton: isSpanish ? 'Volver a selección' : 'Back to selection',
    exitConfirmation: {
      title: isSpanish ? '¿Salir del formulario?' : 'Exit form?',
      message: isSpanish 
        ? 'Si sales ahora, perderás todo el progreso del formulario. ¿Estás seguro de que deseas continuar?'
        : 'If you exit now, you will lose all form progress. Are you sure you want to continue?',
      stay: isSpanish ? 'Continuar con el formulario' : 'Continue with form',
      exit: isSpanish ? 'Sí, salir' : 'Yes, exit',
    },
    breadcrumb: {
      home: isSpanish ? 'Inicio' : 'Home',
      admissions: isSpanish ? 'Admisiones' : 'Admissions',
      school: isSpanish ? 'Admisión Escolar' : 'School Admission',
      learningCenter: isSpanish ? 'Centro de Aprendizaje' : 'Learning Center',
    },
  };

  // Handle back button click - show confirmation
  const handleBackClick = () => {
    setShowExitConfirmation(true);
  };

  // Confirm exit and go back to selection
  const confirmExit = () => {
    setShowExitConfirmation(false);
    setSelectedForm('none');
  };

  // Cancel exit and stay on form
  const cancelExit = () => {
    setShowExitConfirmation(false);
  };

  // Form selection view
  if (selectedForm === 'none') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-3">
            {t.title}
          </h2>
          <p className="text-slate-600">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* School Admission Card */}
          <div 
            className="bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-[#C41E3A] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col"
            onClick={() => setSelectedForm('school')}
          >
            <div className="w-16 h-16 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mb-6 group-hover:bg-[#C41E3A]/20 transition-colors">
              <School className="w-8 h-8 text-[#C41E3A]" />
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-1">
              {t.school.title}
            </h3>
            <p className="text-sm text-[#C41E3A] font-medium mb-4">
              {t.school.subtitle}
            </p>
            
            <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
              {t.school.description}
            </p>
            
            <ul className="space-y-2 mb-6">
              {t.school.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full py-3 px-6 bg-slate-900 text-white rounded-lg font-medium group-hover:bg-[#C41E3A] transition-colors mt-auto">
              {t.selectButton}
            </button>
          </div>

          {/* Learning Center Card */}
          <div 
            className="bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-[#B45309] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col"
            onClick={() => setSelectedForm('learning-center')}
          >
            <div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mb-6 group-hover:bg-[#B45309]/20 transition-colors">
              <Lightbulb className="w-8 h-8 text-[#B45309]" />
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-1">
              {t.learningCenter.title}
            </h3>
            <p className="text-sm text-[#B45309] font-medium mb-4">
              {t.learningCenter.subtitle}
            </p>
            
            <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
              {t.learningCenter.description}
            </p>
            
            <ul className="space-y-2 mb-6">
              {t.learningCenter.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full py-3 px-6 bg-slate-900 text-white rounded-lg font-medium group-hover:bg-[#B45309] transition-colors mt-auto">
              {t.selectButton}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // School Admission Form
  if (selectedForm === 'school') {
    return (
      <div>
        {showExitConfirmation && (
          <ExitConfirmationModal 
            t={t} 
            onCancel={cancelExit} 
            onConfirm={confirmExit} 
          />
        )}
        <FormHeader 
          formType="school" 
          locale={locale}
          isSpanish={isSpanish}
          t={t}
          onBackClick={handleBackClick}
        />
        <SchoolAdmissionForm locale={locale} />
      </div>
    );
  }

  // Learning Center Form
  if (selectedForm === 'learning-center') {
    return (
      <div>
        {showExitConfirmation && (
          <ExitConfirmationModal 
            t={t} 
            onCancel={cancelExit} 
            onConfirm={confirmExit} 
          />
        )}
        <FormHeader 
          formType="learning-center" 
          locale={locale}
          isSpanish={isSpanish}
          t={t}
          onBackClick={handleBackClick}
        />
        <LearningCenterAdmissionForm />
      </div>
    );
  }

  return null;
}

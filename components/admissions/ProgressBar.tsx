'use client';

import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  sections: { id: string; label: string; icon?: ReactNode }[];
  currentSection: string;
}

export default function AdmissionProgressBar({
  currentStep,
  totalSteps,
  sections,
  currentSection,
}: ProgressBarProps) {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  
  const currentSectionIndex = sections.findIndex(s => s.id === currentSection);

  return (
    <div className="w-full mb-8">
      {/* Overall progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
            Progreso
          </span>
          <span className="text-xs font-semibold text-[#C41E3A]">
            {progressPercentage}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C41E3A] to-[#DC3545] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-400">Paso {currentStep} de {totalSteps}</span>
        </div>
      </div>

      {/* Section indicators */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200" style={{ marginLeft: '24px', marginRight: '24px' }} />
        
        {/* Section dots */}
        <div className="relative flex justify-between">
          {sections.map((section, index) => {
            const isCompleted = index < currentSectionIndex;
            const isCurrent = index === currentSectionIndex;

            return (
              <div
                key={section.id}
                className="flex flex-col items-center"
              >
                {/* Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 z-10
                    ${isCompleted 
                      ? 'bg-[#C41E3A] text-white' 
                      : isCurrent 
                        ? 'bg-white border-2 border-[#C41E3A] text-[#C41E3A]' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={18} strokeWidth={2.5} />
                  ) : (
                    <span className="text-sm font-semibold">{section.id}</span>
                  )}
                </div>
                
                {/* Label */}
                <span
                  className={`
                    mt-2 text-[10px] uppercase tracking-wider font-medium text-center max-w-[80px]
                    transition-colors duration-300
                    ${isCurrent 
                      ? 'text-[#C41E3A]' 
                      : isCompleted 
                        ? 'text-slate-600' 
                        : 'text-slate-400'
                    }
                  `}
                >
                  {section.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

// ============================================
// TEXT INPUT STEP
// ============================================
interface TextInputStepProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'number';
  required?: boolean;
  error?: string;
}

export function TextInputStep({
  label,
  description,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  error,
}: TextInputStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2">
          {label}
          {required && <span className="text-[#C41E3A] ml-1">*</span>}
        </h3>
        {description && (
          <p className="text-slate-500 text-sm">{description}</p>
        )}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-4 py-4 text-lg border rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/20 focus:border-[#C41E3A]
          ${error ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}
        `}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}

// ============================================
// TEXTAREA STEP
// ============================================
interface TextareaStepProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

export function TextareaStep({
  label,
  description,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4,
}: TextareaStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2">
          {label}
          {required && <span className="text-[#C41E3A] ml-1">*</span>}
        </h3>
        {description && (
          <p className="text-slate-500 text-sm">{description}</p>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-4 text-lg border rounded-lg resize-none
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/20 focus:border-[#C41E3A]
          ${error ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}
        `}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}

// ============================================
// RADIO/SINGLE SELECT STEP
// ============================================
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface RadioStepProps {
  label: string;
  description?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  columns?: 1 | 2 | 3;
}

export function RadioStep({
  label,
  description,
  options,
  value,
  onChange,
  required,
  error,
  columns = 1,
}: RadioStepProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2">
          {label}
          {required && <span className="text-[#C41E3A] ml-1">*</span>}
        </h3>
        {description && (
          <p className="text-slate-500 text-sm">{description}</p>
        )}
      </div>
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              p-4 rounded-lg border-2 text-left
              transition-all duration-200
              ${value === option.value
                ? 'border-[#C41E3A] bg-[#C41E3A]/5'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  transition-all duration-200
                  ${value === option.value
                    ? 'border-[#C41E3A] bg-[#C41E3A]'
                    : 'border-slate-300'
                  }
                `}
              >
                {value === option.value && (
                  <Check size={12} className="text-white" strokeWidth={3} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span className={`font-medium ${value === option.value ? 'text-[#C41E3A]' : 'text-slate-700'}`}>
                    {option.label}
                  </span>
                </div>
                {option.description && (
                  <p className="text-slate-500 text-sm mt-1">{option.description}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}

// ============================================
// CHECKBOX/MULTI-SELECT STEP
// ============================================
interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
}

interface CheckboxStepProps {
  label: string;
  description?: string;
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
  error?: string;
  columns?: 1 | 2 | 3;
}

export function CheckboxStep({
  label,
  description,
  options,
  values,
  onChange,
  required,
  error,
  columns = 1,
}: CheckboxStepProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  };

  const toggleValue = (optionValue: string) => {
    if (values.includes(optionValue)) {
      onChange(values.filter(v => v !== optionValue));
    } else {
      onChange([...values, optionValue]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2">
          {label}
          {required && <span className="text-[#C41E3A] ml-1">*</span>}
        </h3>
        {description && (
          <p className="text-slate-500 text-sm">{description}</p>
        )}
      </div>
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {options.map((option) => {
          const isSelected = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleValue(option.value)}
              className={`
                p-4 rounded-lg border-2 text-left
                transition-all duration-200
                ${isSelected
                  ? 'border-[#C41E3A] bg-[#C41E3A]/5'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center
                    transition-all duration-200
                    ${isSelected
                      ? 'border-[#C41E3A] bg-[#C41E3A]'
                      : 'border-slate-300'
                    }
                  `}
                >
                  {isSelected && (
                    <Check size={12} className="text-white" strokeWidth={3} />
                  )}
                </div>
                <div className="flex-1">
                  <span className={`font-medium ${isSelected ? 'text-[#C41E3A]' : 'text-slate-700'}`}>
                    {option.label}
                  </span>
                  {option.description && (
                    <p className="text-slate-500 text-sm mt-1">{option.description}</p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}

// ============================================
// SELECT DROPDOWN STEP
// ============================================
interface SelectOption {
  value: string;
  label: string;
}

interface SelectStepProps {
  label: string;
  description?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export function SelectStep({
  label,
  description,
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  required,
  error,
}: SelectStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2">
          {label}
          {required && <span className="text-[#C41E3A] ml-1">*</span>}
        </h3>
        {description && (
          <p className="text-slate-500 text-sm">{description}</p>
        )}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-4 text-lg border rounded-lg appearance-none
          bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[length:20px] bg-[right_16px_center]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/20 focus:border-[#C41E3A]
          ${error ? 'border-red-400 bg-red-50' : 'border-slate-200'}
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}

// ============================================
// CONFIRMATION CHECKBOX STEP
// ============================================
interface ConfirmationStepProps {
  label: string;
  description?: string;
  items: { key: string; label: string; required?: boolean }[];
  values: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
  error?: string;
}

export function ConfirmationStep({
  label,
  description,
  items,
  values,
  onChange,
  error,
}: ConfirmationStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2">
          {label}
        </h3>
        {description && (
          <p className="text-slate-500 text-sm">{description}</p>
        )}
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item.key}
            className={`
              flex items-start gap-3 p-4 rounded-lg border cursor-pointer
              transition-all duration-200
              ${values[item.key]
                ? 'border-[#C41E3A] bg-[#C41E3A]/5'
                : 'border-slate-200 bg-white hover:border-slate-300'
              }
            `}
          >
            <input
              type="checkbox"
              checked={values[item.key] || false}
              onChange={(e) => onChange(item.key, e.target.checked)}
              className="sr-only"
            />
            <div
              className={`
                w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                transition-all duration-200
                ${values[item.key]
                  ? 'border-[#C41E3A] bg-[#C41E3A]'
                  : 'border-slate-300'
                }
              `}
            >
              {values[item.key] && (
                <Check size={12} className="text-white" strokeWidth={3} />
              )}
            </div>
            <span className={`text-sm ${values[item.key] ? 'text-slate-800' : 'text-slate-600'}`}>
              {item.label}
              {item.required && <span className="text-[#C41E3A] ml-1">*</span>}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}

// ============================================
// NAVIGATION BUTTONS
// ============================================
interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  backLabel?: string;
  isSubmitting?: boolean;
  isLastStep?: boolean;
}

export function NavigationButtons({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  nextLabel = 'Continuar',
  backLabel = 'Atrás',
  isSubmitting = false,
  isLastStep = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft size={18} />
          <span>{backLabel}</span>
        </button>
      ) : (
        <div />
      )}
      
      {showNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-lg font-medium
            transition-all duration-200
            ${isLastStep
              ? 'bg-[#C41E3A] text-white hover:bg-[#9B1B30]'
              : 'bg-slate-900 text-white hover:bg-slate-800'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <span>{isSubmitting ? 'Enviando...' : nextLabel}</span>
          {!isSubmitting && <ChevronRight size={18} />}
        </button>
      )}
    </div>
  );
}

// ============================================
// FORM WRAPPER
// ============================================
interface FormStepWrapperProps {
  children: ReactNode;
  sectionTitle?: string;
  sectionIcon?: ReactNode;
}

export function FormStepWrapper({
  children,
  sectionTitle,
  sectionIcon,
}: FormStepWrapperProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm">
      {sectionTitle && (
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          {sectionIcon && (
            <div className="w-10 h-10 rounded-full bg-[#C41E3A]/10 flex items-center justify-center">
              {sectionIcon}
            </div>
          )}
          <h2 className="text-sm uppercase tracking-widest text-slate-500 font-medium">
            {sectionTitle}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}

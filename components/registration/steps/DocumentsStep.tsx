'use client';

import { useTranslations } from 'next-intl';
import { Upload, FileText, X, Check, AlertCircle } from 'lucide-react';
import type { RegistrationFormData, PreschoolDocument } from '@/lib/supabase/types';

interface DocumentsStepProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
}

const documentTypes: { type: PreschoolDocument['document_type']; required: boolean }[] = [
  { type: 'birth_certificate', required: true },
  { type: 'vaccination_card', required: true },
  { type: 'photo', required: true },
  { type: 'previous_records', required: false },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export default function DocumentsStep({ formData, updateFormData }: DocumentsStepProps) {
  const t = useTranslations('RegistrationPage.steps.documents');

  const handleFileChange = (type: PreschoolDocument['document_type'], file: File | null) => {
    const updatedDocs = formData.documents.map(doc =>
      doc.type === type ? { ...doc, file } : doc
    );
    updateFormData({ documents: updatedDocs });
  };

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return t('error_file_too_large');
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return t('error_invalid_type');
    }
    return null;
  };

  const getDocumentByType = (type: PreschoolDocument['document_type']) => {
    return formData.documents.find(doc => doc.type === type);
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-8">
        {t('description')}
      </p>

      {/* File Requirements */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">{t('requirements_title')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('requirement_format')}</li>
              <li>{t('requirement_size')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Document Upload Fields */}
      <div className="space-y-4">
        {documentTypes.map(({ type, required }) => {
          const doc = getDocumentByType(type);
          const hasFile = doc?.file !== null;

          return (
            <div
              key={type}
              className={`border-2 rounded-lg p-4 transition-colors ${
                hasFile ? 'border-green-300 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className={`w-5 h-5 ${hasFile ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="font-medium text-gray-900">
                    {t(`types.${type}`)}
                  </span>
                  {required && (
                    <span className="text-xs text-red-500">*</span>
                  )}
                </div>
                {hasFile && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </div>

              {hasFile && doc?.file ? (
                <div className="flex items-center justify-between bg-white rounded p-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600 truncate">
                      {doc.file.name}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      ({(doc.file.size / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFileChange(type, null)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#C41E3A] hover:bg-red-50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {t('click_to_upload')}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PDF, JPG, PNG (max 5MB)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const error = validateFile(file);
                        if (error) {
                          alert(error);
                          return;
                        }
                        handleFileChange(type, file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>

      {/* Note about documents */}
      <p className="text-sm text-gray-500 text-center">
        {t('note')}
      </p>
    </div>
  );
}

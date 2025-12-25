'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  // Student Information
  studentName: string;
  studentLastName: string;
  studentDocument: string;
  studentBirthDate: string;
  studentGrade: string;
  
  // Parent/Guardian Information
  parentName: string;
  parentLastName: string;
  parentDocument: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  parentCity: string;
  
  // Additional Information
  previousSchool: string;
  medicalConditions: string;
  specialNeeds: string;
  howDidYouHear: string;
  message: string;
}

export default function AdmissionsForm({ locale }: { locale: string }) {
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    studentLastName: '',
    studentDocument: '',
    studentBirthDate: '',
    studentGrade: '',
    parentName: '',
    parentLastName: '',
    parentDocument: '',
    parentEmail: '',
    parentPhone: '',
    parentAddress: '',
    parentCity: 'Cartagena',
    previousSchool: '',
    medicalConditions: '',
    specialNeeds: '',
    howDidYouHear: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          studentName: '',
          studentLastName: '',
          studentDocument: '',
          studentBirthDate: '',
          studentGrade: '',
          parentName: '',
          parentLastName: '',
          parentDocument: '',
          parentEmail: '',
          parentPhone: '',
          parentAddress: '',
          parentCity: 'Cartagena',
          previousSchool: '',
          medicalConditions: '',
          specialNeeds: '',
          howDidYouHear: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = locale === 'es' ? {
    title: 'Formulario de Admisiones',
    subtitle: 'Complete el siguiente formulario para iniciar el proceso de admisión',
    studentInfo: 'Información del Estudiante',
    studentName: 'Nombres del Estudiante',
    studentLastName: 'Apellidos del Estudiante',
    studentDocument: 'Número de Documento (TI/RC)',
    studentBirthDate: 'Fecha de Nacimiento',
    studentGrade: 'Grado al que Aplica',
    selectGrade: 'Seleccione un grado',
    preschool: 'Pre-Jardín / Jardín',
    transition: 'Transición',
    grade1: '1° Primaria',
    grade2: '2° Primaria',
    grade3: '3° Primaria',
    grade4: '4° Primaria',
    grade5: '5° Primaria',
    grade6: '6° Bachillerato',
    grade7: '7° Bachillerato',
    grade8: '8° Bachillerato',
    grade9: '9° Bachillerato',
    grade10: '10° Bachillerato',
    grade11: '11° Bachillerato',
    parentInfo: 'Información del Padre/Madre o Acudiente',
    parentName: 'Nombres del Acudiente',
    parentLastName: 'Apellidos del Acudiente',
    parentDocument: 'Número de Cédula',
    parentEmail: 'Correo Electrónico',
    parentPhone: 'Teléfono/Celular',
    parentAddress: 'Dirección de Residencia',
    parentCity: 'Ciudad',
    additionalInfo: 'Información Adicional',
    previousSchool: 'Colegio de Procedencia',
    medicalConditions: 'Condiciones Médicas o Alergias',
    specialNeeds: 'Necesidades Educativas Especiales',
    howDidYouHear: '¿Cómo nos conoció?',
    selectOption: 'Seleccione una opción',
    webSearch: 'Búsqueda en Internet',
    socialMedia: 'Redes Sociales',
    referral: 'Recomendación',
    advertising: 'Publicidad',
    other: 'Otro',
    message: 'Mensaje o Comentarios Adicionales',
    messagePlaceholder: 'Comente cualquier información adicional que considere relevante...',
    submit: 'Enviar Solicitud',
    submitting: 'Enviando...',
    successMessage: '¡Solicitud enviada exitosamente! Nos pondremos en contacto pronto.',
    errorMessage: 'Hubo un error al enviar el formulario. Por favor, intente nuevamente.',
  } : {
    title: 'Admissions Form',
    subtitle: 'Complete the following form to begin the admissions process',
    studentInfo: 'Student Information',
    studentName: 'Student First Name',
    studentLastName: 'Student Last Name',
    studentDocument: 'Document Number (TI/RC)',
    studentBirthDate: 'Date of Birth',
    studentGrade: 'Grade Applying For',
    selectGrade: 'Select a grade',
    preschool: 'Pre-K / Kindergarten',
    transition: 'Transition',
    grade1: '1st Grade',
    grade2: '2nd Grade',
    grade3: '3rd Grade',
    grade4: '4th Grade',
    grade5: '5th Grade',
    grade6: '6th Grade',
    grade7: '7th Grade',
    grade8: '8th Grade',
    grade9: '9th Grade',
    grade10: '10th Grade',
    grade11: '11th Grade',
    parentInfo: 'Parent/Guardian Information',
    parentName: 'Parent/Guardian First Name',
    parentLastName: 'Parent/Guardian Last Name',
    parentDocument: 'ID Number',
    parentEmail: 'Email Address',
    parentPhone: 'Phone Number',
    parentAddress: 'Home Address',
    parentCity: 'City',
    additionalInfo: 'Additional Information',
    previousSchool: 'Previous School',
    medicalConditions: 'Medical Conditions or Allergies',
    specialNeeds: 'Special Educational Needs',
    howDidYouHear: 'How did you hear about us?',
    selectOption: 'Select an option',
    webSearch: 'Internet Search',
    socialMedia: 'Social Media',
    referral: 'Referral',
    advertising: 'Advertising',
    other: 'Other',
    message: 'Message or Additional Comments',
    messagePlaceholder: 'Share any additional information you consider relevant...',
    submit: 'Submit Application',
    submitting: 'Submitting...',
    successMessage: 'Application submitted successfully! We will contact you soon.',
    errorMessage: 'There was an error submitting the form. Please try again.',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-light mb-4 text-black">{t.title}</h2>
        <p className="text-gray-500 font-light">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Student Information */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] mb-6 text-gray-400 font-medium">
            {t.studentInfo}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.studentName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.studentLastName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="studentLastName"
                value={formData.studentLastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.studentDocument}
              </label>
              <input
                type="text"
                name="studentDocument"
                value={formData.studentDocument}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.studentBirthDate} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="studentBirthDate"
                value={formData.studentBirthDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black mb-2">
                {t.studentGrade} <span className="text-red-500">*</span>
              </label>
              <select
                name="studentGrade"
                value={formData.studentGrade}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              >
                <option value="">{t.selectGrade}</option>
                <option value="preschool">{t.preschool}</option>
                <option value="transition">{t.transition}</option>
                <option value="grade1">{t.grade1}</option>
                <option value="grade2">{t.grade2}</option>
                <option value="grade3">{t.grade3}</option>
                <option value="grade4">{t.grade4}</option>
                <option value="grade5">{t.grade5}</option>
                <option value="grade6">{t.grade6}</option>
                <option value="grade7">{t.grade7}</option>
                <option value="grade8">{t.grade8}</option>
                <option value="grade9">{t.grade9}</option>
                <option value="grade10">{t.grade10}</option>
                <option value="grade11">{t.grade11}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Parent Information */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] mb-6 text-gray-400 font-medium">
            {t.parentInfo}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.parentName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.parentLastName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="parentLastName"
                value={formData.parentLastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.parentDocument} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="parentDocument"
                value={formData.parentDocument}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.parentEmail} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.parentPhone} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                required
                placeholder="+57 "
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.parentCity} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="parentCity"
                value={formData.parentCity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black mb-2">
                {t.parentAddress} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="parentAddress"
                value={formData.parentAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] mb-6 text-gray-400 font-medium">
            {t.additionalInfo}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.previousSchool}
              </label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.medicalConditions}
              </label>
              <input
                type="text"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.specialNeeds}
              </label>
              <input
                type="text"
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.howDidYouHear}
              </label>
              <select
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              >
                <option value="">{t.selectOption}</option>
                <option value="web">{t.webSearch}</option>
                <option value="social">{t.socialMedia}</option>
                <option value="referral">{t.referral}</option>
                <option value="advertising">{t.advertising}</option>
                <option value="other">{t.other}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={t.messagePlaceholder}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-center">
            {t.successMessage}
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-center">
            {t.errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
  const t = useTranslations('ContactPage');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subjectText = formData.subject || 'Consulta General';
    const body = `Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ATeléfono: ${formData.phone || 'No proporcionado'}%0D%0AAsunto: ${subjectText}%0D%0A%0D%0AMensaje:%0D%0A${formData.message}`;
    
    window.location.href = `mailto:admisiones@vis.edu.co?subject=${encodeURIComponent(subjectText + ' - ' + formData.name)}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
            {t('form.name')} *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
            {t('form.email')} *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
          {t('form.phone')}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
          {t('form.subject')} *
        </label>
        <select
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C41E3A] transition-colors bg-white"
        >
          <option value="">{t('form.selectSubject')}</option>
          <option value="Admisiones">{t('form.subjects.admissions')}</option>
          <option value="Información Académica">{t('form.subjects.academics')}</option>
          <option value="Agendar Visita">{t('form.subjects.visit')}</option>
          <option value="Otro">{t('form.subjects.other')}</option>
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
          {t('form.message')} *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C41E3A] transition-colors resize-none"
        ></textarea>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-outline inline-flex items-center justify-center gap-2">
          <Send className="w-4 h-4" strokeWidth={1.5} />
          <span>{t('form.submit')}</span>
        </button>
      </div>
    </form>
  );
}

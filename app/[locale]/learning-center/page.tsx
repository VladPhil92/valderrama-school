import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { 
  BookOpen, 
  Users, 
  Brain, 
  GraduationCap, 
  Clock, 
  Award,
  Target,
  Globe,
  Lightbulb,
  FileText,
  Calendar,
  MessageCircle,
  MapPin,
  Phone,
  CheckCircle
} from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LearningCenterPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('LearningCenterPage');

  const services = [
    { key: 'tutoring', icon: BookOpen, color: '#1F2A44' },
    { key: 'reinforcement', icon: Brain, color: '#6D28D9' },
    { key: 'enrichment', icon: Target, color: '#0F766E' },
    { key: 'languages', icon: Globe, color: '#B45309' },
  ];

  const programs = [
    { key: 'standardized', icon: FileText },
    { key: 'summer', icon: Calendar },
    { key: 'homework', icon: GraduationCap },
    { key: 'study', icon: Lightbulb },
  ];

  const galleryImages = [
    { src: '/images/Salon-de-Tutorias.webp', alt: 'Tutoring Room 1' },
    { src: '/images/Salon-de-tutorias-2.webp', alt: 'Tutoring Room 2' },
    { src: '/images/Recepcion.webp', alt: 'Reception' },
    { src: '/images/Fachada-Colegio.webp', alt: 'School Building' },
  ];

  return (
    <>
      <Navigation locale={locale} />
      <main className="min-h-screen bg-white">
        
        {/* Hero Banner */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src="/images/learningcenterkinder.jpeg"
            alt="Learning Center at Valderrama International School"
            fill
            className="object-cover scale-105"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A44]/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-4xl">
              {/* Decorative line */}
              <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
              
              {/* Badge */}
              <p className="text-sm md:text-base uppercase tracking-[0.25em] font-semibold mb-4 [text-shadow:_1px_1px_4px_rgb(0_0_0_/_50%)]" style={{ color: '#DC2626' }}>
                {t('intro.badge')}
              </p>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight !text-white [text-shadow:_2px_4px_12px_rgb(0_0_0_/_60%)]">
                {t('hero.title')}
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-light leading-relaxed mb-8 !text-white/90 [text-shadow:_1px_1px_8px_rgb(0_0_0_/_60%)]">
                {t('hero.subtitle')}
              </p>
              
              {/* Decorative line */}
              <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-8" />
              
              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/573186428218?text=Hola,%20me%20gustaría%20agendar%20una%20clase%20diagnóstica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('hero.cta.diagnostic')}
                </a>
                <Link 
                  href={"/" + locale + "/admissions"}
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-xl"
                >
                  <GraduationCap className="w-5 h-5" />
                  {t('hero.cta.admissions')}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Bottom fade for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Introduction Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[#C41E3A]/10 text-[#C41E3A] text-sm font-medium rounded-full mb-6 animate-fadeIn">
                {t('intro.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-light mb-8 text-black">
                {t('intro.title')}
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mb-6 text-lg">
                {t('intro.description1')}
              </p>
              <p className="text-gray-500 font-light leading-relaxed">
                {t('intro.description2')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-8 card-hover-lift">
                <div className="w-12 h-12 bg-[#1F2A44]/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[#1F2A44]" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-black">
                  {t('intro.forWhom.title')}
                </h3>
                <ul className="space-y-3">
                  {['1', '2', '3', '4'].map((num) => (
                    <li key={num} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#0F766E] flex-shrink-0 mt-0.5" />
                      <span>{t('intro.forWhom.items.' + num)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 card-hover-lift">
                <div className="w-12 h-12 bg-[#C41E3A]/10 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-black">
                  {t('intro.difference.title')}
                </h3>
                <ul className="space-y-3">
                  {['1', '2', '3', '4'].map((num) => (
                    <li key={num} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#C41E3A] flex-shrink-0 mt-0.5" />
                      <span>{t('intro.difference.items.' + num)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-4 text-black">
                {t('services.title')}
              </h2>
              <p className="text-gray-500 font-light">
                {t('services.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map(({ key, icon: Icon, color }) => (
                <div 
                  key={key} 
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 card-hover-lift"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 icon-hover"
                    style={{ backgroundColor: color + '15' }}
                  >
                    <Icon className="w-7 h-7" style={{ color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-black">
                    {t('services.' + key + '.title')}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    {t('services.' + key + '.description')}
                  </p>
                  <p className="text-sm text-gray-400 font-light border-t border-gray-100 pt-4">
                    {t('services.' + key + '.subjects')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Programs */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-4 text-black">
                {t('programs.title')}
              </h2>
              <p className="text-gray-500 font-light">
                {t('programs.subtitle')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map(({ key, icon: Icon }) => (
                <div 
                  key={key}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-[#C41E3A]/5 transition-all duration-300 group card-hover-lift"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                    <Icon className="w-8 h-8 text-[#C41E3A] icon-hover" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-black">
                    {t('programs.items.' + key + '.title')}
                  </h3>
                  <p className="text-sm text-gray-500 font-light">
                    {t('programs.items.' + key + '.description')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-light mb-2 text-black">
                {t('gallery.title')}
              </h2>
              <p className="text-gray-500 font-light">
                {t('gallery.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map(({ src, alt }) => (
                <div 
                  key={src}
                  className="relative h-48 md:h-64 rounded-lg overflow-hidden group"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Clock className="w-6 h-6 text-[#C41E3A]" />
                <h2 className="text-2xl font-light text-black">
                  {t('schedule.title')}
                </h2>
              </div>
              <p className="text-center text-gray-500 mb-8">
                {t('schedule.description')}
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-black text-sm">{t('schedule.afternoon.title')}</p>
                  <p className="text-[#C41E3A] font-light">{t('schedule.afternoon.time')}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-black text-sm">{t('schedule.saturday.title')}</p>
                  <p className="text-[#C41E3A] font-light">{t('schedule.saturday.time')}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-black text-sm">{t('schedule.sunday.title')}</p>
                  <p className="text-[#C41E3A] font-light">{t('schedule.sunday.time')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section - Clean & Elegant */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-black">
                {t('cta.title')}
              </h2>
              <p className="text-gray-500 font-light max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Diagnostic CTA Card */}
              <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-[#25D366]" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-black">
                  {t('cta.diagnostic.title')}
                </h3>
                <p className="text-gray-500 font-light mb-6 text-sm leading-relaxed flex-grow">
                  {t('cta.diagnostic.description')}
                </p>
                <a 
                  href="https://wa.me/573186428218?text=Hola,%20me%20gustaría%20agendar%20una%20clase%20diagnóstica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full mt-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('cta.diagnostic.button')}
                </a>
              </div>

              {/* Admissions CTA Card */}
              <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#C41E3A]/10 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-[#C41E3A]" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-black">
                  {t('cta.admissions.title')}
                </h3>
                <p className="text-gray-500 font-light mb-6 text-sm leading-relaxed flex-grow">
                  {t('cta.admissions.description')}
                </p>
                <Link 
                  href={"/" + locale + "/admissions"}
                  className="inline-flex items-center justify-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full mt-auto"
                >
                  <GraduationCap className="w-4 h-4" />
                  {t('cta.admissions.button')}
                </Link>
              </div>
            </div>

            {/* Contact Info - Subtle footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t('contact.address')}</span>
                </div>
                <span className="hidden sm:block text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{t('contact.phone')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer locale={locale} />
    </>
  );
}

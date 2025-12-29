import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, BookOpen, Heart, Globe, Target, GraduationCap, Music, Palette, Trophy, Calendar, ScrollText, Brain, MessageSquare } from 'lucide-react';
import { locales } from '@/i18n/request';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('HomePage');

  return (
    <>
      <Navigation locale={locale} />
      <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white min-h-[90vh] flex items-center justify-center">
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="text-center">
            {/* Centered Logo */}
            <div className="mb-10">
              <Image
                src="/images/shared/LOGO-VALDERRAMA-INTERNATIONAL-SCHOOL.webp"
                alt="Valderrama International School"
                width={280}
                height={140}
                className="mx-auto"
                priority
                quality={90}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">
              {t('hero.tagline')}
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6 tracking-tight text-slate-900">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-4 font-light tracking-wide text-slate-600">
              {t('hero.subtitle')}
            </p>
            <p className="text-base mb-10 max-w-2xl mx-auto font-light leading-relaxed text-slate-500">
              {t('hero.description')}
            </p>
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="label-tag">{t('hero.badges.pbl')}</span>
              <span className="label-tag">{t('hero.badges.tutoring')}</span>
              <span className="label-tag">{t('hero.badges.arts')}</span>
              <span className="label-tag">{t('hero.badges.diploma')}</span>
              <span className="label-tag">{t('hero.badges.calendar')}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/learning-center`} className="btn btn-outline">
                {t('hero.ctaTutoring')}
              </Link>
              <Link href={`/${locale}/about`} className="btn btn-outline-red">
                {t('hero.ctaAbout')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Valderrama is... Essence */}
      <section id="essence" className="py-28 relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-50 to-[#C41E3A]/5" />
        <div className="hidden md:block absolute right-0 top-0 w-1/3 h-full opacity-10" aria-hidden="true">
          <Image
            src="/images/facilities/Fachada-Colegio.webp"
            alt=""
            fill
            className="object-cover object-left"
            sizes="33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
        </div>
        <div className="container-custom max-w-4xl text-center relative z-10">
          <div className="inline-block mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C41E3A] font-medium">
              {t('essence.label')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-slate-900 leading-relaxed">
            {t('essence.title')}
          </h2>
          <div className="accent-line" />
          <p className="text-slate-600 font-light leading-relaxed text-lg max-w-2xl mx-auto mt-8 text-center">
            {t('essence.description')}
          </p>
        </div>
      </section>

      {/* Founded Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-[#C41E3A]" strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">2025</span>
            </div>
            <h2 className="text-3xl font-serif mb-6 text-slate-900">{t('founded.title')}</h2>
            <p className="text-slate-500 font-light leading-relaxed mb-6 text-center max-w-2xl mx-auto">
              {t('founded.text1')}
            </p>
            <p className="text-slate-500 font-light leading-relaxed text-center max-w-2xl mx-auto">
              {t('founded.text2')}
            </p>
          </div>
          <div className="relative h-80 mt-12 rounded overflow-hidden max-w-4xl mx-auto">
            <Image
              src="/images/facilities/Fachada-Colegio.webp"
              alt="Valderrama International School"
              fill
              className="object-cover img-refined"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </div>
      </section>
      {/* Pedagogical Approach */}
      <section className="py-28 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">
            {t('approach.title')}
          </h2>
          <p className="section-subtitle">
            {t('approach.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-6 h-6 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-4 text-slate-800 uppercase tracking-wider">
                {t('approach.meaningful.title')}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm font-light max-w-xs mx-auto text-center">
                {t('approach.meaningful.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-6 h-6 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-4 text-slate-800 uppercase tracking-wider">
                {t('approach.technology.title')}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm font-light max-w-xs mx-auto text-center">
                {t('approach.technology.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-6 h-6 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-4 text-slate-800 uppercase tracking-wider">
                {t('approach.global.title')}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm font-light max-w-xs mx-auto text-center">
                {t('approach.global.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-28 bg-white">
        <div className="container-custom">
          <h2 className="section-title">
            {t('programs.title')}
          </h2>
          <p className="section-subtitle">
            {t('programs.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center">
              <span className="text-3xl mb-6 block">🎀</span>
              <h3 className="text-xl font-serif mb-4 text-slate-900">{t('programs.preschool.title')}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-center">
                {t('programs.preschool.description')}
              </p>
            </div>
            <div className="feature-card text-center">
              <span className="text-3xl mb-6 block">📚</span>
              <h3 className="text-xl font-serif mb-4 text-slate-900">{t('programs.elementary.title')}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-center">
                {t('programs.elementary.description')}
              </p>
            </div>
            <div className="feature-card text-center">
              <span className="text-3xl mb-6 block">🎓</span>
              <h3 className="text-xl font-serif mb-4 text-slate-900">{t('programs.secondary.title')}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-center">
                {t('programs.secondary.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Valderrama */}
      <section className="py-28 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">
            {t('values.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-8 bg-white rounded border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-5">
                <Target className="w-5 h-5 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-3 text-slate-800 uppercase tracking-wider">
                {t('values.pbl.title')}
              </h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('values.pbl.description')}</p>
            </div>
            <div className="text-center p-8 bg-white rounded border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-5">
                <Heart className="w-5 h-5 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-3 text-slate-800 uppercase tracking-wider">
                {t('values.serviceLearning.title')}
              </h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('values.serviceLearning.description')}</p>
            </div>
            <div className="text-center p-8 bg-white rounded border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-5">
                <Users className="w-5 h-5 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-3 text-slate-800 uppercase tracking-wider">
                {t('values.tutoring.title')}
              </h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('values.tutoring.description')}</p>
            </div>
            <div className="text-center p-8 bg-white rounded border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-5">
                <MessageSquare className="w-5 h-5 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-3 text-slate-800 uppercase tracking-wider">
                {t('values.bilingual.title')}
              </h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('values.bilingual.description')}</p>
            </div>
            <div className="text-center p-8 bg-white rounded border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-5">
                <GraduationCap className="w-5 h-5 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-3 text-slate-800 uppercase tracking-wider">
                {t('values.diploma.title')}
              </h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('values.diploma.description')}</p>
            </div>
            <div className="text-center p-8 bg-white rounded border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-5">
                <Palette className="w-5 h-5 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-3 text-slate-800 uppercase tracking-wider">
                {t('values.arts.title')}
              </h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('values.arts.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-28 bg-white">
        <div className="container-custom">
          <h2 className="section-title">
            {t('facilities.title')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mt-16">
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded mb-4">
                <Image src="/images/facilities/Recepcion.webp" alt="Recepción" fill className="object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-slate-600 group-hover:text-[#C41E3A] transition-colors duration-300">{t('facilities.reception')}</h3>
            </div>
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded mb-4">
                <Image src="/images/student-life/Patio-de-Juegos-1.webp" alt="Patio de Juegos" fill className="object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-slate-600 group-hover:text-[#C41E3A] transition-colors duration-300">{t('facilities.playground')}</h3>
            </div>
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded mb-4">
                <Image src="/images/student-life/Salon-de-Musica.webp" alt="Salón de Música" fill className="object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-slate-600 group-hover:text-[#C41E3A] transition-colors duration-300">{t('facilities.music')}</h3>
            </div>
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded mb-4">
                <Image src="/images/student-life/Salon-de-Danza.webp" alt="Salón de Danza" fill className="object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-slate-600 group-hover:text-[#C41E3A] transition-colors duration-300">{t('facilities.dance')}</h3>
            </div>
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded mb-4">
                <Image src="/images/learning-center/Salon-de-Tutorias.webp" alt="Salón de Tutorías" fill className="object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-slate-600 group-hover:text-[#C41E3A] transition-colors duration-300">{t('facilities.tutoring')}</h3>
            </div>
            <div className="group">
              <div className="relative h-64 overflow-hidden rounded mb-4">
                <Image src="/images/facilities/Cafeteria.webp" alt="Cafetería" fill className="object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-slate-600 group-hover:text-[#C41E3A] transition-colors duration-300">{t('facilities.cafeteria')}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Tutoring Center */}
      <section className="py-28 text-white" style={{ backgroundColor: "#000000" }}>
        <div className="container-custom">
          <h2 className="text-3xl font-serif text-center mb-4 !text-white">
            {t('tutoring.title')}
          </h2>
          <p className="text-center text-slate-400 font-light max-w-2xl mx-auto mb-16">
            {t('tutoring.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-slate-700 rounded p-8 flex flex-col h-full hover:border-[#C41E3A] transition-all duration-300 hover:bg-slate-800/50">
              <h3 className="text-xl font-serif mb-6">{t('tutoring.elementary.title')}</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-light mb-8 flex-grow">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.elementary.subjects.math')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.elementary.subjects.reading')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.elementary.subjects.science')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.elementary.subjects.english')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.elementary.subjects.social')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.elementary.subjects.art')}</li>
              </ul>
              <a href="https://wa.me/573186428218" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#C41E3A] hover:text-white transition-colors duration-300 mt-auto inline-flex items-center gap-2">
                {t('tutoring.cta')} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="border border-slate-700 rounded p-8 flex flex-col h-full hover:border-[#C41E3A] transition-all duration-300 hover:bg-slate-800/50">
              <h3 className="text-xl font-serif mb-6">{t('tutoring.middle.title')}</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-light mb-8 flex-grow">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.middle.subjects.algebra')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.middle.subjects.geometry')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.middle.subjects.biology')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.middle.subjects.chemistry')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.middle.subjects.physics')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.middle.subjects.history')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.middle.subjects.english')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.middle.subjects.literature')}</li>
              </ul>
              <a href="https://wa.me/573186428218" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#C41E3A] hover:text-white transition-colors duration-300 mt-auto inline-flex items-center gap-2">
                {t('tutoring.cta')} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="border border-slate-700 rounded p-8 flex flex-col h-full hover:border-[#C41E3A] transition-all duration-300 hover:bg-slate-800/50">
              <h3 className="text-xl font-serif mb-6">{t('tutoring.high.title')}</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-light mb-8 flex-grow">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.high.subjects.calculus')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.high.subjects.advChem')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.high.subjects.advPhysics')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.high.subjects.apBio')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.high.subjects.literature')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.high.subjects.worldHistory')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.high.subjects.satPrep')}</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C41E3A] rounded-full"></span>{t('tutoring.high.subjects.ibPrep')}</li>
              </ul>
              <a href="https://wa.me/573186428218" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#C41E3A] hover:text-white transition-colors duration-300 mt-auto inline-flex items-center gap-2">
                {t('tutoring.cta')} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Extracurricular */}
      <section className="py-28 bg-white">
        <div className="container-custom">
          <h2 className="section-title">
            {t('extracurricular.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="feature-card text-center">
              <div className="w-16 h-16 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <Music className="w-7 h-7 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif mb-4 text-slate-900">{t('extracurricular.music.title')}</h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('extracurricular.music.description')}</p>
            </div>
            <div className="feature-card text-center">
              <div className="w-16 h-16 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <Palette className="w-7 h-7 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif mb-4 text-slate-900">{t('extracurricular.art.title')}</h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('extracurricular.art.description')}</p>
            </div>
            <div className="feature-card text-center">
              <div className="w-16 h-16 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-7 h-7 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif mb-4 text-slate-900">{t('extracurricular.sports.title')}</h3>
              <p className="text-slate-500 text-sm font-light text-center">{t('extracurricular.sports.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* International Diplomas */}
      <section className="py-28 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">
            {t('diplomas.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-10 bg-white rounded border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <ScrollText className="w-7 h-7 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-4 text-slate-800 uppercase tracking-wider">{t('diplomas.us.title')}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-center">{t('diplomas.us.description')}</p>
            </div>
            <div className="text-center p-10 bg-white rounded border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-7 h-7 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-4 text-slate-800 uppercase tracking-wider">{t('diplomas.ib.title')}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-center">{t('diplomas.ib.description')}</p>
            </div>
            <div className="text-center p-10 bg-white rounded border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-7 h-7 text-[#C41E3A]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold mb-4 text-slate-800 uppercase tracking-wider">{t('diplomas.calendar.title')}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-center">{t('diplomas.calendar.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32" style={{ backgroundColor: "#000000" }}>
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-white">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-12 max-w-lg mx-auto text-slate-400 font-light text-center">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://wa.me/573186428218"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-minimal-red"
            >
              {t('cta.contact')}
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer locale={locale} />
    </>
  );
}

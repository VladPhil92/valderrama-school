import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, BookOpen, Heart, Globe, Target, GraduationCap, Music, Palette, Trophy, Calendar, Award, Lightbulb, ScrollText, Brain, MessageSquare } from 'lucide-react';
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
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="text-center">
            {/* Centered Logo */}
            <div className="mb-8">
              <Image
                src="/images/LOGO-VALDERRAMA-INTERNATIONAL-SCHOOL.png"
                alt="Valderrama International School"
                width={280}
                height={140}
                className="mx-auto"
                priority
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
              {t('hero.tagline')}
            </p>
            <h1 className="text-2xl md:text-4xl font-light mb-4 tracking-wide text-black">
              {t('hero.title')}
            </h1>
            <p className="text-base md:text-lg mb-3 font-light tracking-wide text-gray-600">
              {t('hero.subtitle')}
            </p>
            <p className="text-sm mb-8 max-w-2xl mx-auto font-light leading-relaxed text-gray-500">
              {t('hero.description')}
            </p>
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="text-xs border border-gray-200 px-3 py-1.5 text-gray-600">{t('hero.badges.pbl')}</span>
              <span className="text-xs border border-gray-200 px-3 py-1.5 text-gray-600">{t('hero.badges.tutoring')}</span>
              <span className="text-xs border border-gray-200 px-3 py-1.5 text-gray-600">{t('hero.badges.arts')}</span>
              <span className="text-xs border border-gray-200 px-3 py-1.5 text-gray-600">{t('hero.badges.diploma')}</span>
              <span className="text-xs border border-gray-200 px-3 py-1.5 text-gray-600">{t('hero.badges.calendar')}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/learning-center`} className="btn btn-outline">
                {t('hero.ctaTutoring')}
              </Link>
              <Link href={`/${locale}/about`} className="btn btn-outline">
                {t('hero.ctaAbout')}
              </Link>
            </div>
          </div>
        </div>
      </section>

            {/* Valderrama is... Essence */}
            <section id="essence" className="py-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-[#C41E3A]/5" />
              <div className="hidden md:block absolute right-0 top-0 w-1/3 h-full opacity-10" aria-hidden="true">
                <Image
                  src="/images/Fachada-Colegio.png"
                  alt=""
                  fill
                  className="object-cover object-left"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
              </div>
              <div className="container-custom max-w-4xl text-center relative z-10">
                <div className="inline-block mb-8">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#C41E3A] font-medium px-4 py-2 border border-[#C41E3A]/20 rounded-full bg-white/80 backdrop-blur-sm">
                    {t('essence.label')}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light mb-8 text-black leading-relaxed">
                  {t('essence.title')}
                </h2>
                <div className="w-16 h-0.5 bg-[#C41E3A]/30 mx-auto mb-8" />
                <p className="text-gray-600 font-light leading-relaxed text-lg max-w-2xl mx-auto">
                  {t('essence.description')}
                </p>
              </div>
            </section>

      {/* Founded Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-[#C41E3A]" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">2025</span>
              </div>
              <h2 className="text-2xl font-light mb-6 text-black">{t('founded.title')}</h2>
              <p className="text-gray-500 font-light leading-relaxed mb-6">
                {t('founded.text1')}
              </p>
              <p className="text-gray-500 font-light leading-relaxed">
                {t('founded.text2')}
              </p>
            </div>
            <div className="relative h-80">
              <Image
                src="/images/Fachada-Colegio.png"
                alt="Valderrama International School"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pedagogical Approach */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-4 text-gray-400 font-medium">
            {t('approach.title')}
          </h2>
          <p className="text-center text-gray-500 font-light max-w-2xl mx-auto mb-16" style={{ textAlign: 'center' }}>
            {t('approach.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                {t('approach.meaningful.title')}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light">
                {t('approach.meaningful.description')}
              </p>
            </div>
            <div className="text-center">
              <Brain className="w-6 h-6 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                {t('approach.technology.title')}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light">
                {t('approach.technology.description')}
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-6 h-6 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                {t('approach.global.title')}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light">
                {t('approach.global.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-4 text-gray-400 font-medium">
            {t('programs.title')}
          </h2>
          <p className="text-center text-gray-500 font-light max-w-2xl mx-auto mb-16" style={{ textAlign: 'center' }}>
            {t('programs.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 text-center">
              <span className="text-2xl mb-4 block">🎀</span>
              <h3 className="text-lg font-medium mb-3 text-black">{t('programs.preschool.title')}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {t('programs.preschool.description')}
              </p>
            </div>
            <div className="p-8 bg-gray-50 text-center">
              <span className="text-2xl mb-4 block">📚</span>
              <h3 className="text-lg font-medium mb-3 text-black">{t('programs.elementary.title')}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {t('programs.elementary.description')}
              </p>
            </div>
            <div className="p-8 bg-gray-50 text-center">
              <span className="text-2xl mb-4 block">🎓</span>
              <h3 className="text-lg font-medium mb-3 text-black">{t('programs.secondary.title')}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {t('programs.secondary.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Valderrama */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
            {t('values.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Target className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                {t('values.pbl.title')}
              </h3>
              <p className="text-gray-500 text-sm font-light">{t('values.pbl.description')}</p>
            </div>
            <div className="text-center p-6">
              <Heart className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                {t('values.serviceLearning.title')}
              </h3>
              <p className="text-gray-500 text-sm font-light">{t('values.serviceLearning.description')}</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                {t('values.tutoring.title')}
              </h3>
              <p className="text-gray-500 text-sm font-light">{t('values.tutoring.description')}</p>
            </div>
            <div className="text-center p-6">
              <MessageSquare className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                {t('values.bilingual.title')}
              </h3>
              <p className="text-gray-500 text-sm font-light">{t('values.bilingual.description')}</p>
            </div>
            <div className="text-center p-6">
              <GraduationCap className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                {t('values.diploma.title')}
              </h3>
              <p className="text-gray-500 text-sm font-light">{t('values.diploma.description')}</p>
            </div>
            <div className="text-center p-6">
              <Palette className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                {t('values.arts.title')}
              </h3>
              <p className="text-gray-500 text-sm font-light">{t('values.arts.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
            {t('facilities.title')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="group">
              <div className="relative h-56 overflow-hidden mb-4">
                <Image src="/images/Recepcion.png" alt="Recepción" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-600 group-hover:text-[#C41E3A] transition-colors">{t('facilities.reception')}</h3>
            </div>
            <div className="group">
              <div className="relative h-56 overflow-hidden mb-4">
                <Image src="/images/Patio-de-Juegos-1.png" alt="Patio de Juegos" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-600 group-hover:text-[#C41E3A] transition-colors">{t('facilities.playground')}</h3>
            </div>
            <div className="group">
              <div className="relative h-56 overflow-hidden mb-4">
                <Image src="/images/Salon-de-Musica.png" alt="Salón de Música" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-600 group-hover:text-[#C41E3A] transition-colors">{t('facilities.music')}</h3>
            </div>
            <div className="group">
              <div className="relative h-56 overflow-hidden mb-4">
                <Image src="/images/Salon-de-Danza.png" alt="Salón de Danza" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-600 group-hover:text-[#C41E3A] transition-colors">{t('facilities.dance')}</h3>
            </div>
            <div className="group">
              <div className="relative h-56 overflow-hidden mb-4">
                <Image src="/images/Salon-de-Tutorias.png" alt="Salón de Tutorías" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-600 group-hover:text-[#C41E3A] transition-colors">{t('facilities.tutoring')}</h3>
            </div>
            <div className="group">
              <div className="relative h-56 overflow-hidden mb-4">
                <Image src="/images/Cafeteria.png" alt="Cafetería" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-600 group-hover:text-[#C41E3A] transition-colors">{t('facilities.cafeteria')}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Tutoring Center */}
      <section className="py-24 bg-black text-white">
        <div className="container-custom">
          <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-4 text-white font-medium">
            {t('tutoring.title')}
          </h2>
          <p className="text-center text-gray-400 font-light max-w-2xl mx-auto mb-16" style={{ textAlign: 'center' }}>
            {t('tutoring.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-700 p-8 flex flex-col h-full hover:border-[#C41E3A] transition-colors">
              <h3 className="text-lg font-medium mb-4">{t('tutoring.elementary.title')}</h3>
              <ul className="space-y-2 text-gray-400 text-sm font-light mb-6 flex-grow">
                <li>• {t('tutoring.elementary.subjects.math')}</li>
                <li>• {t('tutoring.elementary.subjects.reading')}</li>
                <li>• {t('tutoring.elementary.subjects.science')}</li>
                <li>• {t('tutoring.elementary.subjects.english')}</li>
                <li>• {t('tutoring.elementary.subjects.social')}</li>
                <li>• {t('tutoring.elementary.subjects.art')}</li>
              </ul>
                          <a href="https://wa.me/573186428218" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#C41E3A] hover:text-white transition-colors mt-auto">
                            {t('tutoring.cta')} →
                          </a>
                        </div>
                        <div className="border border-gray-700 p-8 flex flex-col h-full hover:border-[#C41E3A] transition-colors">
                          <h3 className="text-lg font-medium mb-4">{t('tutoring.middle.title')}</h3>
                          <ul className="space-y-2 text-gray-400 text-sm font-light mb-6 flex-grow">
                            <li>• {t('tutoring.middle.subjects.algebra')}</li>
                            <li>• {t('tutoring.middle.subjects.geometry')}</li>
                            <li>• {t('tutoring.middle.subjects.biology')}</li>
                            <li>• {t('tutoring.middle.subjects.chemistry')}</li>
                            <li>• {t('tutoring.middle.subjects.physics')}</li>
                            <li>• {t('tutoring.middle.subjects.history')}</li>
                            <li>• {t('tutoring.middle.subjects.english')}</li>
                            <li>• {t('tutoring.middle.subjects.literature')}</li>
                          </ul>
                          <a href="https://wa.me/573186428218" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#C41E3A] hover:text-white transition-colors mt-auto">
                            {t('tutoring.cta')} →
                          </a>
                        </div>
                        <div className="border border-gray-700 p-8 flex flex-col h-full hover:border-[#C41E3A] transition-colors">
                          <h3 className="text-lg font-medium mb-4">{t('tutoring.high.title')}</h3>
                          <ul className="space-y-2 text-gray-400 text-sm font-light mb-6 flex-grow">
                            <li>• {t('tutoring.high.subjects.calculus')}</li>
                            <li>• {t('tutoring.high.subjects.advChem')}</li>
                            <li>• {t('tutoring.high.subjects.advPhysics')}</li>
                            <li>• {t('tutoring.high.subjects.apBio')}</li>
                            <li>• {t('tutoring.high.subjects.literature')}</li>
                            <li>• {t('tutoring.high.subjects.worldHistory')}</li>
                            <li>• {t('tutoring.high.subjects.satPrep')}</li>
                            <li>• {t('tutoring.high.subjects.ibPrep')}</li>
                          </ul>
                          <a href="https://wa.me/573186428218" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#C41E3A] hover:text-white transition-colors mt-auto">
                            {t('tutoring.cta')} →
                          </a>
            </div>
          </div>
        </div>
      </section>

      {/* Extracurricular */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
            {t('extracurricular.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-100 hover:border-[#C41E3A] transition-colors">
              <Music className="w-8 h-8 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-lg font-medium mb-3">{t('extracurricular.music.title')}</h3>
              <p className="text-gray-500 text-sm font-light mb-4">{t('extracurricular.music.description')}</p>
            </div>
            <div className="text-center p-8 border border-gray-100 hover:border-[#C41E3A] transition-colors">
              <Palette className="w-8 h-8 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-lg font-medium mb-3">{t('extracurricular.art.title')}</h3>
              <p className="text-gray-500 text-sm font-light mb-4">{t('extracurricular.art.description')}</p>
            </div>
            <div className="text-center p-8 border border-gray-100 hover:border-[#C41E3A] transition-colors">
              <Trophy className="w-8 h-8 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-lg font-medium mb-3">{t('extracurricular.sports.title')}</h3>
              <p className="text-gray-500 text-sm font-light mb-4">{t('extracurricular.sports.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* International Diplomas */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
            {t('diplomas.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <ScrollText className="w-8 h-8 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">{t('diplomas.us.title')}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">{t('diplomas.us.description')}</p>
            </div>
            <div className="text-center p-8">
              <Globe className="w-8 h-8 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">{t('diplomas.ib.title')}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">{t('diplomas.ib.description')}</p>
            </div>
            <div className="text-center p-8">
              <Calendar className="w-8 h-8 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
              <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">{t('diplomas.calendar.title')}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">{t('diplomas.calendar.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-6 text-white tracking-wide">
            {t('cta.title')}
          </h2>
          <p className="text-base mb-12 max-w-lg mx-auto text-gray-400 font-light">
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

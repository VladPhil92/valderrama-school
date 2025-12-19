import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { Target, Eye, Award, Users, BookOpen, Heart } from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('AboutPage');

  return (
    <>
      <Navigation locale={locale} />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-24 bg-white">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-light mb-6 tracking-wide text-black">
              {t('hero.title')}
            </h1>
            <p className="text-base max-w-2xl mx-auto text-gray-500 font-light leading-relaxed" style={{ textAlign: 'center' }}>
              {t('hero.description')}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="text-center">
                <Target className="w-8 h-8 mb-6 text-[#C41E3A] mx-auto" strokeWidth={1.5} />
                <h2 className="text-sm uppercase tracking-[0.2em] mb-4 text-gray-400 font-medium">
                  {t('mission.label')}
                </h2>
                <p className="text-gray-600 leading-relaxed font-light" style={{ textAlign: 'center' }}>
                  {t('mission.text')}
                </p>
              </div>
              <div className="text-center">
                <Eye className="w-8 h-8 mb-6 text-[#C41E3A] mx-auto" strokeWidth={1.5} />
                <h2 className="text-sm uppercase tracking-[0.2em] mb-4 text-gray-400 font-medium">
                  {t('vision.label')}
                </h2>
                <p className="text-gray-600 leading-relaxed font-light" style={{ textAlign: 'center' }}>
                  {t('vision.text')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {['excellence', 'integrity', 'innovation', 'respect', 'responsibility'].map((value) => (
                <div key={value} className="text-center">
                  <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                    {t(`values.${value}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed" style={{ textAlign: 'center' }}>
                    {t(`values.${value}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Approach */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('approach.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
                <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                  {t('approach.personalized.title')}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed" style={{ textAlign: 'center' }}>
                  {t('approach.personalized.description')}
                </p>
              </div>
              <div className="text-center">
                <BookOpen className="w-6 h-6 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
                <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                  {t('approach.pbl.title')}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed" style={{ textAlign: 'center' }}>
                  {t('approach.pbl.description')}
                </p>
              </div>
              <div className="text-center">
                <Heart className="w-6 h-6 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
                <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                  {t('approach.service.title')}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed" style={{ textAlign: 'center' }}>
                  {t('approach.service.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-24 bg-white">
          <div className="container-custom max-w-3xl">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-12 text-gray-400 font-medium">
              {t('history.title')}
            </h2>
            <p className="text-gray-600 font-light leading-relaxed" style={{ textAlign: 'center' }}>
              {t('history.text')}
            </p>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

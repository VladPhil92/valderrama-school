import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { GraduationCap, BookOpen, Users, Globe } from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ProgramsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('ProgramsPage');

  const levels = [
    { key: 'preschool', icon: Users, grades: 'Pre-K & K' },
    { key: 'elementary', icon: BookOpen, grades: '1-5' },
    { key: 'middle', icon: GraduationCap, grades: '6-8' },
    { key: 'high', icon: Globe, grades: '9-11' },
  ];

  return (
    <>
      <Navigation locale={locale} />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-24 bg-white">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-light mb-6 tracking-wide text-black">
              {t('hero.title')}
            </h1>
            <p className="text-base max-w-2xl mx-auto text-gray-500 font-light leading-relaxed">
              {t('hero.description')}
            </p>
          </div>
        </section>

        {/* Academic Levels */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('levels.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {levels.map(({ key, icon: Icon, grades }) => (
                <div key={key} className="text-center p-8 bg-white">
                  <Icon className="w-8 h-8 mx-auto mb-6 text-black" strokeWidth={1} />
                  <span className="text-xs text-gray-400 uppercase tracking-widest">{grades}</span>
                  <h3 className="text-lg font-medium mt-2 mb-4 text-black">
                    {t(`levels.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    {t(`levels.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bilingual Education */}
        <section className="py-24 bg-white">
          <div className="container-custom max-w-3xl text-center">
            <Globe className="w-8 h-8 mx-auto mb-8 text-black" strokeWidth={1} />
            <h2 className="text-2xl font-light mb-6 text-black">
              {t('bilingual.title')}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8">
              {t('bilingual.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['cambridge', 'toefl', 'clil'].map((cert) => (
                <span key={cert} className="text-xs uppercase tracking-widest text-gray-400 border border-gray-200 px-4 py-2">
                  {t(`bilingual.certifications.${cert}`)}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('methodology.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {['montessori', 'pbl', 'blended'].map((method) => (
                <div key={method} className="text-center">
                  <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                    {t(`methodology.${method}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    {t(`methodology.${method}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

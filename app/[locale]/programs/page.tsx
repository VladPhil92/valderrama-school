import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { GraduationCap, BookOpen, Users, Globe } from 'lucide-react';
import Image from 'next/image';

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
      { key: 'preschool', icon: Users, grades: 'N-K', color: '#C41E3A' },
      { key: 'elementary', icon: BookOpen, grades: '1-5', color: '#1F2A44' },
      { key: 'middle', icon: GraduationCap, grades: '6-8', color: '#0F766E' },
      { key: 'high', icon: Globe, grades: '9-12', color: '#6D28D9' },
    ];

  return (
    <>
      <Navigation locale={locale} />
      <main className="min-h-screen bg-white">
                {/* Hero */}
                <section className="py-24 bg-white">
                  <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-light mb-6 tracking-wide text-black">
                          {t('hero.title')}
                        </h1>
                        <p className="text-base max-w-2xl mx-auto text-gray-500 font-light leading-relaxed">
                          {t('hero.description')}
                        </p>
                      </div>
                      <div className="relative h-80 lg:h-96">
                        <Image
                          src="/images/learning-center/Salon-de-Tutorias.webp"
                          alt="Classroom"
                          fill
                          className="object-cover rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </section>

        {/* Academic Levels */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('levels.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {levels.map(({ key, icon: Icon, grades, color }) => (
                              <div key={key} className="text-center p-8 bg-white">
                                <div className="w-14 h-14 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                                  <Icon className="w-7 h-7" style={{ color }} strokeWidth={1.5} />
                                </div>
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
                    <div className="relative w-32 h-32 mx-auto mb-8">
                      <Image
                        src="/images/programs/world-flags-globe.webp"
                        alt="Multilingual Globe"
                        fill
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                      {['montessori', 'pbl', 'serviceLearning', 'blended'].map((method) => (
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

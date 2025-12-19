import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { BookOpen, Users, Brain, GraduationCap, Clock, Award } from 'lucide-react';

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
    { key: 'tutoring', icon: BookOpen },
    { key: 'reinforcement', icon: Brain },
    { key: 'support', icon: Users },
    { key: 'extracurricular', icon: Award },
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

        {/* About */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom max-w-3xl text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-8 text-black" strokeWidth={1} />
            <h2 className="text-2xl font-light mb-6 text-black">
              {t('about.title')}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('services.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(({ key, icon: Icon }) => (
                <div key={key} className="text-center p-8 border border-gray-100 hover:border-black transition-colors">
                  <Icon className="w-8 h-8 mx-auto mb-6 text-black" strokeWidth={1} />
                  <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    {t(`services.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-12">
              <Clock className="w-8 h-8 mx-auto mb-6 text-black" strokeWidth={1} />
              <h2 className="text-2xl font-light mb-4 text-black">
                {t('schedule.title')}
              </h2>
              <p className="text-gray-500 font-light">
                {t('schedule.description')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 text-center">
                <h3 className="text-sm font-medium text-black uppercase tracking-wider mb-2">
                  {t('schedule.afternoon.title')}
                </h3>
                <p className="text-gray-500 text-sm">{t('schedule.afternoon.time')}</p>
              </div>
              <div className="bg-white p-6 text-center">
                <h3 className="text-sm font-medium text-black uppercase tracking-wider mb-2">
                  {t('schedule.saturday.title')}
                </h3>
                <p className="text-gray-500 text-sm">{t('schedule.saturday.time')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-black">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-light mb-6 text-white tracking-wide">
              {t('cta.title')}
            </h2>
            <p className="text-base mb-10 max-w-lg mx-auto text-gray-400 font-light">
              {t('cta.description')}
            </p>
            <Link href={`/${locale}/contact`} className="btn-minimal-white">
              {t('cta.button')}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

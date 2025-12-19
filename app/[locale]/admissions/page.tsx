import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { FileText, Calendar, Users, CheckCircle } from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AdmissionsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('AdmissionsPage');

  const steps = [
    { key: 'inquiry', icon: FileText },
    { key: 'visit', icon: Calendar },
    { key: 'application', icon: FileText },
    { key: 'interview', icon: Users },
    { key: 'decision', icon: CheckCircle },
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

        {/* Process Steps */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('process.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map(({ key, icon: Icon }, index) => (
                <div key={key} className="text-center">
                  <div className="relative">
                    <span className="text-4xl font-light text-gray-200 absolute -top-2 left-1/2 -translate-x-1/2">
                      {index + 1}
                    </span>
                    <Icon className="w-6 h-6 mx-auto mb-6 text-black relative z-10 mt-8" strokeWidth={1} />
                  </div>
                  <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                    {t(`process.steps.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">
                    {t(`process.steps.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24 bg-white">
          <div className="container-custom max-w-3xl">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-12 text-gray-400 font-medium">
              {t('requirements.title')}
            </h2>
            <div className="space-y-4">
              {['documents', 'academic', 'interview', 'health'].map((req) => (
                <div key={req} className="flex items-start gap-4 p-4 bg-gray-50">
                  <CheckCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" strokeWidth={1} />
                  <div>
                    <h3 className="text-sm font-medium text-black mb-1">
                      {t(`requirements.items.${req}.title`)}
                    </h3>
                    <p className="text-gray-500 text-sm font-light">
                      {t(`requirements.items.${req}.description`)}
                    </p>
                  </div>
                </div>
              ))}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn-minimal-white">
                {t('cta.schedule')}
              </Link>
              <a href="mailto:admisiones@valderramainternationalschool.com" className="btn-minimal-white-outline">
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

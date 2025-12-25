import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RegistrationForm from '@/components/registration/RegistrationForm';
import { locales } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RegistrationPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('RegistrationPage');

  return (
    <>
      <Navigation locale={locale} />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16 border-b border-gray-100">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16">
          <div className="container-custom">
            <RegistrationForm />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

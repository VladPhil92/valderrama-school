import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { Users, Heart, Handshake, Calendar } from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function CommunityPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('CommunityPage');

  const pillars = [
    { key: 'parents', icon: Users },
    { key: 'service', icon: Heart },
    { key: 'partnerships', icon: Handshake },
    { key: 'events', icon: Calendar },
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

        {/* Pillars */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('pillars.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map(({ key, icon: Icon }) => (
                <div key={key} className="text-center p-8">
                  <Icon className="w-8 h-8 mx-auto mb-6 text-black" strokeWidth={1} />
                  <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                    {t(`pillars.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    {t(`pillars.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Parent Involvement */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative h-80 bg-gray-200">
                <Image
                  src="/images/Recepcion.png"
                  alt="Community"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-light mb-6 text-black">
                  {t('involvement.title')}
                </h2>
                <p className="text-gray-500 font-light leading-relaxed mb-6">
                  {t('involvement.description')}
                </p>
                <ul className="space-y-3">
                  {['council', 'workshops', 'volunteering', 'communication'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                      {t(`involvement.items.${item}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Social Impact */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom max-w-3xl text-center">
            <Heart className="w-8 h-8 mx-auto mb-8 text-black" strokeWidth={1} />
            <h2 className="text-2xl font-light mb-6 text-black">
              {t('impact.title')}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed">
              {t('impact.description')}
            </p>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

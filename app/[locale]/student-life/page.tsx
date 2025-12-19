import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { Heart, Music, Trophy, Users, Palette, Award } from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function StudentLifePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('StudentLifePage');

  const activities = [
    { key: 'arts', icon: Palette },
    { key: 'music', icon: Music },
    { key: 'sports', icon: Trophy },
    { key: 'leadership', icon: Award },
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

        {/* Well-being */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom max-w-3xl text-center">
            <Heart className="w-8 h-8 mx-auto mb-8 text-black" strokeWidth={1} />
            <h2 className="text-2xl font-light mb-6 text-black">
              {t('wellbeing.title')}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed">
              {t('wellbeing.description')}
            </p>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('activities.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {activities.map(({ key, icon: Icon }) => (
                <div key={key} className="text-center p-8 bg-gray-50">
                  <Icon className="w-8 h-8 mx-auto mb-6 text-black" strokeWidth={1} />
                  <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                    {t(`activities.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    {t(`activities.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <Users className="w-8 h-8 mb-6 text-black" strokeWidth={1} />
                <h2 className="text-2xl font-light mb-6 text-black">
                  {t('community.title')}
                </h2>
                <p className="text-gray-500 font-light leading-relaxed mb-6">
                  {t('community.description')}
                </p>
                <ul className="space-y-3">
                  {['events', 'clubs', 'service', 'leadership'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                      {t(`community.items.${item}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-80 bg-gray-200">
                <Image
                  src="/images/Patio de Juegos 2.png"
                  alt="Student Life"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

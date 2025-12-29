import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { Heart, Music, Trophy, Users, Palette, Award, Utensils } from 'lucide-react';

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
      { key: 'arts', icon: Palette, color: '#6D28D9', image: '/images/student-life/Salo-de-arte.webp' },
      { key: 'music', icon: Music, color: '#C41E3A', image: '/images/student-life/Salon-de-Musica.webp' },
      { key: 'sports', icon: Trophy, color: '#B45309', image: '/images/student-life/Patio-de-Juegos-1.webp' },
      { key: 'leadership', icon: Award, color: '#0F766E', image: '/images/student-life/Salon-de-Danza.webp' },
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
            <div className="w-16 h-16 mx-auto mb-8 rounded-full flex items-center justify-center bg-[#C41E3A]/10">
              <Heart className="w-8 h-8 text-[#C41E3A]" strokeWidth={1.5} />
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activities.map(({ key, icon: Icon, color, image }) => (
                <div key={key} className="group bg-gray-50 rounded-lg overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={image}
                      alt={key}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                        <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-sm font-medium text-black uppercase tracking-wider">
                        {t(`activities.${key}.title`)}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">
                      {t(`activities.${key}.description`)}
                    </p>
                  </div>
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
                <div className="w-14 h-14 mb-6 rounded-full flex items-center justify-center bg-[#0F766E]/10">
                <Users className="w-7 h-7 text-[#0F766E]" strokeWidth={1.5} />
              </div>
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
              <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/images/student-life/Patio-de-Juegos-2.webp"
                  alt="Student Life"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cafeteria & Nutrition */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden order-2 md:order-1">
                <Image
                  src="/images/facilities/Cafeteria.webp"
                  alt={t('cafeteria.title')}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-14 h-14 mb-6 rounded-full flex items-center justify-center bg-[#B45309]/10">
                  <Utensils className="w-7 h-7 text-[#B45309]" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-light mb-6 text-black">
                  {t('cafeteria.title')}
                </h2>
                <p className="text-gray-500 font-light leading-relaxed mb-6">
                  {t('cafeteria.description')}
                </p>
                <ul className="space-y-3">
                  {['healthy', 'balanced', 'allergies', 'supervision'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-[#B45309] rounded-full"></span>
                      {t(`cafeteria.items.${item}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-16 text-gray-400 font-medium">
              {t('gallery.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="relative h-48 rounded-lg overflow-hidden group">
                <Image
                  src="/images/student-life/Kinder.webp"
                  alt="Kinder"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden group">
                <Image
                  src="/images/student-life/Prekinder.webp"
                  alt="Prekinder"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden group">
                <Image
                  src="/images/student-life/Patio-de-Juegos-1.webp"
                  alt="Playground"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden group">
                <Image
                  src="/images/student-life/Salo-de-arte.webp"
                  alt="Art Room"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden group">
                <Image
                  src="/images/student-life/Salon-de-Danza.webp"
                  alt="Dance Room"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden group">
                <Image
                  src="/images/learning-center/Salon-de-tutorias-2.webp"
                  alt="Tutoring Room"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
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

import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MapPin, Mail, Clock } from 'lucide-react';
import { locales } from '@/i18n/request';
import schoolConfig from '@/config/school.json';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('ContactPage');

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

        {/* Contact Info */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-8">
                <MapPin className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
                <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                  {t('info.address.title')}
                </h3>
                <p className="text-gray-500 text-sm font-light" style={{ textAlign: 'center' }}>
                  Cl 5a # 8 - 82<br />
                  Castillogrande, Cartagena<br />
                  Colombia
                </p>
              </div>
              <div className="text-center p-8">
                <a 
                  href={schoolConfig.social.whatsappLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:opacity-70 transition-opacity mb-4"
                >
                  <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                  WhatsApp
                </h3>
                <p className="text-gray-500 text-sm font-light" style={{ textAlign: 'center' }}>
                  <a 
                    href={schoolConfig.social.whatsappLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#C41E3A] transition-colors"
                  >
                    {t('info.phone.title')}
                  </a>
                </p>
              </div>
                            <div className="text-center p-8">
                              <Mail className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
                              <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                                {t('info.email.title')}
                              </h3>
                              <p className="text-gray-500 text-sm font-light break-all" style={{ textAlign: 'center' }}>
                                <a href={`mailto:${schoolConfig.contact.email.admissions}`} className="hover:text-[#C41E3A] transition-colors">
                                  {schoolConfig.contact.email.admissions}
                                </a>
                              </p>
                            </div>
              <div className="text-center p-8">
                <Clock className="w-6 h-6 mx-auto mb-4 text-[#C41E3A]" strokeWidth={1.5} />
                <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">
                  {t('info.hours.title')}
                </h3>
                <p className="text-gray-500 text-sm font-light" style={{ textAlign: 'center' }}>
                  {t('info.hours.weekdays')}<br />
                  {t('info.hours.saturday')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24 bg-white">
          <div className="container-custom max-w-2xl">
            <h2 className="text-sm uppercase tracking-[0.3em] text-center mb-4 text-gray-400 font-medium">
              {t('form.title')}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-12" style={{ textAlign: 'center' }}>
                          {schoolConfig.contact.email.admissions}
                        </p>
                        <ContactForm />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

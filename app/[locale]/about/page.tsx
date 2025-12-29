import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/request';
import { Target, Eye, Users, BookOpen, Heart, UserCircle } from 'lucide-react';

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
            <p className="text-base max-w-2xl mx-auto text-gray-500 font-light leading-relaxed text-center">
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
                <p className="text-gray-600 leading-relaxed font-light text-center">
                  {t('mission.text')}
                </p>
              </div>
              <div className="text-center">
                <Eye className="w-8 h-8 mb-6 text-[#C41E3A] mx-auto" strokeWidth={1.5} />
                <h2 className="text-sm uppercase tracking-[0.2em] mb-4 text-gray-400 font-medium">
                  {t('vision.label')}
                </h2>
                <p className="text-gray-600 leading-relaxed font-light text-center">
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
                  <p className="text-gray-500 text-sm font-light leading-relaxed text-center">
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
                <p className="text-gray-500 text-sm font-light leading-relaxed text-center">
                  {t('approach.personalized.description')}
                </p>
              </div>
              <div className="text-center">
                <BookOpen className="w-6 h-6 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
                <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                  {t('approach.pbl.title')}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed text-center">
                  {t('approach.pbl.description')}
                </p>
              </div>
              <div className="text-center">
                <Heart className="w-6 h-6 mx-auto mb-6 text-[#C41E3A]" strokeWidth={1.5} />
                <h3 className="text-sm font-medium mb-3 text-black uppercase tracking-wider">
                  {t('approach.service.title')}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed text-center">
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
                  <p className="text-gray-600 font-light leading-relaxed mx-auto text-center">
                    {t('history.text')}
                  </p>
                </div>
              </section>

              {/* Team Section */}
              <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom">
                  {/* Section Header */}
                  <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1.5 bg-[#C41E3A]/10 text-[#C41E3A] text-xs uppercase tracking-widest rounded-full mb-6">
                      {t('team.title')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
                      Leadership Team
                    </h2>
                    <p className="text-gray-500 font-light max-w-2xl mx-auto">
                      {t('team.description')}
                    </p>
                  </div>
            
                  {/* Leadership - Featured Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-16">
                    
                    {/* Rector Card */}
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Photo Section - Fixed Height */}
                      <div className="relative h-72 w-full">
                        <Image
                          src="/images/admissions/rector.jpeg"
                          alt="Juan Pablo Valderrama Pino"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-[#C41E3A] text-white text-xs uppercase tracking-wider rounded-full mb-3">
                          {t('team.members.rector.role')}
                        </span>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {t('team.members.rector.name')}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">
                          {t('team.members.rector.credentials')}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {t('team.members.rector.experience')}
                        </p>
                      </div>
                    </div>

                    {/* Director of Admissions Card */}
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Photo Section - Fixed Height */}
                      <div className="relative h-72 w-full">
                        <Image
                          src="/images/admissions/dir_admissiones.jpeg"
                          alt="María del Rosario Pino Bechara"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-[#1F2A44] text-white text-xs uppercase tracking-wider rounded-full mb-3">
                          {t('team.members.admissions.role')}
                        </span>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {t('team.members.admissions.name')}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {t('team.members.admissions.credentials')}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Our Teachers Section */}
              <section className="py-24 bg-white">
                <div className="container-custom">
                  {/* Section Header */}
                  <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1.5 bg-[#1F2A44]/10 text-[#1F2A44] text-xs uppercase tracking-widest rounded-full mb-6">
                      {t('teachers.subtitle')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
                      {t('teachers.title')}
                    </h2>
                    <p className="text-gray-500 font-light max-w-2xl mx-auto">
                      {t('teachers.description')}
                    </p>
                  </div>

                  {/* Teachers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    
                    {/* Yeison Fortich - Math & Science */}
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Photo Section - Fixed Height */}
                      <div className="relative h-72 w-full">
                        <Image
                          src="/images/admissions/jey_math.jpeg"
                          alt={t('teachers.members.yeison.name')}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-[#2E7D32] text-white text-xs uppercase tracking-wider rounded-full mb-3">
                          {t('teachers.members.yeison.role')}
                        </span>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {t('teachers.members.yeison.name')}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {t('teachers.members.yeison.credentials')}
                        </p>
                      </div>
                    </div>

                    {/* Jhefry - English */}
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Photo Section - Fixed Height */}
                      <div className="relative h-72 w-full">
                        <Image
                          src="/images/admissions/jhefry_ingles.jpeg"
                          alt={t('teachers.members.jhefry.name')}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-[#1565C0] text-white text-xs uppercase tracking-wider rounded-full mb-3">
                          {t('teachers.members.jhefry.role')}
                        </span>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {t('teachers.members.jhefry.name')}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {t('teachers.members.jhefry.credentials')}
                        </p>
                      </div>
                    </div>

                    {/* Jacobo José Valderrama - Music */}
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Photo Section - Fixed Height */}
                      <div className="relative h-72 w-full">
                        <Image
                          src="/images/admissions/Jacobo_José_Valderrama.jpeg"
                          alt={t('teachers.members.jacobo.name')}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-[#7B1FA2] text-white text-xs uppercase tracking-wider rounded-full mb-3">
                          {t('teachers.members.jacobo.role')}
                        </span>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {t('teachers.members.jacobo.name')}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {t('teachers.members.jacobo.credentials')}
                        </p>
                      </div>
                    </div>

                    {/* Juan Sebastián Polanco - Spanish & Literature */}
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Photo Section - Fixed Height */}
                      <div className="relative h-72 w-full">
                        <Image
                          src="/images/admissions/Juan_Sebastián_Polanco.jpeg"
                          alt={t('teachers.members.juan.name')}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-[#D84315] text-white text-xs uppercase tracking-wider rounded-full mb-3">
                          {t('teachers.members.juan.role')}
                        </span>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {t('teachers.members.juan.name')}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {t('teachers.members.juan.credentials')}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Coming Soon - Other Staff Section */}
              <section className="py-24 bg-gray-50">
                <div className="container-custom">
                  {/* Divider */}
                  <div className="flex items-center justify-center mb-16">
                    <div className="h-px bg-gray-200 flex-1 max-w-xs"></div>
                    <span className="px-6 text-gray-400 text-sm uppercase tracking-widest">Coming Soon</span>
                    <div className="h-px bg-gray-200 flex-1 max-w-xs"></div>
                  </div>

                  {/* Other Team Members - Placeholder */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {['preschool', 'learningCenter', 'hr', 'academic'].map((member) => (
                      <div key={member} className="bg-white/50 backdrop-blur rounded-xl p-6 border border-gray-100 text-center hover:bg-white hover:shadow-md transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
                          <UserCircle className="w-8 h-8 text-gray-400" strokeWidth={1} />
                        </div>
                        <p className="text-[#C41E3A] text-xs font-medium uppercase tracking-wider mb-2">
                          {t(`team.members.${member}.role`)}
                        </p>
                        <p className="text-gray-400 text-sm font-light italic">
                          {t(`team.members.${member}.name`)}
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

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, User, GraduationCap, Users as UsersIcon } from 'lucide-react';

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '' },
    { key: 'about', href: '/about' },
    { key: 'programs', href: '/programs' },
    { key: 'admissions', href: '/admissions' },
    { key: 'studentLife', href: '/student-life' },
    { key: 'learningCenter', href: '/learning-center' },
    { key: 'community', href: '/community' },
    { key: 'contact', href: '/contact' },
  ];

  const toggleLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    const currentPath = pathname.replace(`/${locale}`, '');
    window.location.href = `/${newLocale}${currentPath}`;
  };

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || (href === '' && pathname === `/${locale}`);
  };

  const authText = locale === 'es' ? {
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    loginTitle: 'Iniciar Sesión',
    loginSubtitle: 'Seleccione su tipo de cuenta',
    student: 'Estudiante',
    teacher: 'Docente',
    comingSoon: 'Próximamente',
    comingSoonMessage: 'Esta funcionalidad estará disponible muy pronto. Estamos trabajando para ofrecerte la mejor experiencia.',
    registerTitle: 'Registro',
    registerMessage: 'El sistema de registro estará disponible próximamente. Por ahora, puede contactarnos directamente para más información.',
    close: 'Cerrar',
  } : {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    loginTitle: 'Sign In',
    loginSubtitle: 'Select your account type',
    student: 'Student',
    teacher: 'Teacher',
    comingSoon: 'Coming Soon',
    comingSoonMessage: 'This feature will be available very soon. We are working to offer you the best experience.',
    registerTitle: 'Registration',
    registerMessage: 'The registration system will be available soon. For now, you can contact us directly for more information.',
    close: 'Close',
  };

  return (
    <>
      <nav style={{ backgroundColor: "#000000" }} 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'border-b border-gray-800 shadow-sm' 
            : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href={`/${locale}`} 
              className="flex-shrink-0 transition-all duration-300 hover:scale-105"
            >
              <div className="w-11 h-11 rounded-full bg-white p-1 shadow-lg">
                <Image
                  src="/images/shared/LOGO-VALDERRAMA-INTERNATIONAL-SCHOOL.webp"
                  alt="Valderrama International School"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain rounded-full"
                  priority
                  quality={90}
                />
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden xl:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    className={`text-[11px] uppercase tracking-wide font-medium transition-all duration-300 relative group whitespace-nowrap font-sans ${
                      isActive(item.href) 
                        ? 'text-[#C41E3A]' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {t(item.key)}
                    <span 
                      className={`absolute -bottom-1 left-0 h-px bg-[#C41E3A] transition-all duration-300 ${
                        isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>
              
            {/* Auth & Language Toggle - Right side */}
            <div className="hidden xl:flex items-center gap-3">
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 whitespace-nowrap"
              >
                <User size={16} strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase tracking-wide font-sans">
                  {authText.signIn}
                </span>
              </button>
              
              <button
                onClick={() => setShowRegisterModal(true)}
                className="flex items-center gap-1.5 bg-[#C41E3A] text-white hover:bg-[#9d1730] transition-all duration-300 px-4 py-1.5 rounded-sm"
              >
                <span className="text-[11px] font-medium uppercase tracking-wide font-sans">
                  {authText.signUp}
                </span>
              </button>

              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-all duration-300 border border-gray-600 hover:border-white px-3 py-1.5 rounded-sm ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C41E3A] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Change language"
              >
                <Globe size={14} strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase tracking-wide font-sans">
                  {locale === 'es' ? 'EN' : 'ES'}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden text-gray-300 hover:text-white transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          style={{ backgroundColor: "#000000" }} className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-screen border-t border-gray-800' : 'max-h-0'
          }`}
        >
          <div className="px-6 pt-4 pb-6 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`block py-2.5 text-sm tracking-wide font-sans transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-[#C41E3A]'
                    : 'text-gray-300 hover:text-white hover:translate-x-1'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-800 mt-4 space-y-3">
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 py-2.5 text-gray-300 hover:text-white text-sm tracking-wide font-sans transition-all duration-300 w-full"
              >
                <User size={16} strokeWidth={1.5} />
                <span>{authText.signIn}</span>
              </button>
              <button
                onClick={() => {
                  setShowRegisterModal(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 bg-[#C41E3A] text-white hover:bg-[#9d1730] text-sm tracking-wide font-sans transition-all duration-300 w-full rounded-sm"
              >
                <span>{authText.signUp}</span>
              </button>
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 py-2.5 text-gray-300 hover:text-white text-sm tracking-wide font-sans transition-all duration-300"
              >
                <Globe size={16} strokeWidth={1.5} />
                <span>{locale === 'es' ? 'English' : 'Español'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full p-8 relative animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-light mb-2 text-black">{authText.loginTitle}</h2>
            <p className="text-gray-500 text-sm mb-8">{authText.loginSubtitle}</p>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-[#C41E3A] hover:bg-gray-50 rounded-lg p-4 transition-all duration-300 group">
                <GraduationCap className="text-gray-400 group-hover:text-[#C41E3A]" size={24} />
                <div className="text-left flex-1">
                  <div className="font-medium text-black">{authText.student}</div>
                  <div className="text-xs text-gray-400">{authText.comingSoon}</div>
                </div>
              </button>
              
              <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-[#C41E3A] hover:bg-gray-50 rounded-lg p-4 transition-all duration-300 group">
                <UsersIcon className="text-gray-400 group-hover:text-[#C41E3A]" size={24} />
                <div className="text-left flex-1">
                  <div className="font-medium text-black">{authText.teacher}</div>
                  <div className="text-xs text-gray-400">{authText.comingSoon}</div>
                </div>
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                {authText.comingSoonMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowRegisterModal(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full p-8 relative animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-light mb-2 text-black">{authText.registerTitle}</h2>
            <p className="text-gray-500 text-sm mb-8">{authText.comingSoon}</p>
            
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <GraduationCap className="mx-auto mb-4 text-[#C41E3A]" size={48} strokeWidth={1.5} />
              <p className="text-sm text-blue-800 mb-6">
                {authText.registerMessage}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block bg-[#C41E3A] text-white px-6 py-2 rounded-sm hover:bg-[#9d1730] transition-all duration-300 text-sm uppercase tracking-wide"
                onClick={() => setShowRegisterModal(false)}
              >
                {locale === 'es' ? 'Contactar' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

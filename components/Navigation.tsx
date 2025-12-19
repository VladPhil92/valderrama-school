'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/images/LOGO VALDERRAMA INTERNATIONAL SCHOOL.png"
              alt="Valderrama International School"
              width={140}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`text-xs uppercase tracking-widest font-medium transition-colors ${
                  isActive(item.href) 
                    ? 'text-[#C41E3A]' 
                    : 'text-black hover:text-[#C41E3A]'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 text-black hover:text-[#C41E3A] transition-colors ml-2 border border-gray-200 hover:border-[#C41E3A] px-3 py-1.5"
              aria-label="Change language"
            >
              <Globe size={14} strokeWidth={1.5} />
              <span className="text-xs font-medium uppercase tracking-widest">
                {locale === 'es' ? 'EN' : 'ES'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-black hover:text-[#C41E3A] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-6 pt-4 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`block py-3 text-sm uppercase tracking-widest transition-colors ${
                  isActive(item.href)
                    ? 'text-[#C41E3A]'
                    : 'text-black hover:text-[#C41E3A]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 py-3 text-black hover:text-[#C41E3A] text-sm uppercase tracking-widest transition-colors"
              >
                <Globe size={16} strokeWidth={1.5} />
                <span>{locale === 'es' ? 'English' : 'Español'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

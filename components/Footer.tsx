'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');

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

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-6">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-2">
                <Image
                  src="/images/LOGO VALDERRAMA INTERNATIONAL SCHOOL.png"
                  alt="Valderrama International School"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Colegio Bilingüe + Learning Center
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">
              Navegación
            </h3>
            <ul className="space-y-3">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm text-gray-400 hover:text-[#C41E3A] transition-colors font-light"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">
              Más
            </h3>
            <ul className="space-y-3">
              {navItems.slice(4).map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm text-gray-400 hover:text-[#C41E3A] transition-colors font-light"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C41E3A] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-gray-400 font-light">
                  Cl 5a # 8 - 82<br />
                  Castillogrande, Cartagena
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C41E3A] flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+573186428218" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  +57 318 642 8218
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C41E3A] flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:admisiones@vis.edu.co" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  admisiones@vis.edu.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-light">
            © {new Date().getFullYear()} Valderrama International School. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-gray-500 font-light">
              Cartagena, Colombia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

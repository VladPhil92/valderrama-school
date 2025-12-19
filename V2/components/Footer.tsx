'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');

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
                  src="/images/LOGO-VALDERRAMA-INTERNATIONAL-SCHOOL.png"
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
                        {tFooter('navigation')}
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
                        {tFooter('more')}
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
                        {tFooter('contact')}
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
                                <a href="mailto:admisiones@valderramainternationalschool.com" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                                  admisiones@valderramainternationalschool.com
                                </a>
              </li>
            </ul>
          </div>
        </div>

                {/* Social Media */}
                <div className="flex justify-center gap-4 mt-8">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C41E3A] transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C41E3A] transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C41E3A] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C41E3A] transition-colors"
                    aria-label="Threads"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.082-1.168 3.59-1.304.89-.08 1.79-.06 2.682.058-.09-.468-.272-.89-.544-1.229-.615-.77-1.727-1.18-3.114-1.18h-.012c-1.135.007-2.093.313-2.77.886l-1.35-1.498c1.073-.96 2.516-1.462 4.168-1.462h.024c2.21.015 3.916.737 4.937 2.09.462.612.78 1.32.948 2.111.665.305 1.27.674 1.81 1.107 1.193.96 2.065 2.25 2.528 3.736.472 1.51.452 3.39-.592 5.18-1.167 2.003-3.064 3.404-5.645 4.166-1.278.377-2.678.57-4.168.58zm-1.043-8.967c-.97.088-1.726.377-2.19.838-.464.46-.647.99-.615 1.576.032.59.334 1.12.85 1.453.567.368 1.3.541 2.06.497 1.076-.058 1.895-.46 2.435-1.198.37-.506.616-1.163.73-1.962-1.063-.18-2.168-.22-3.27-.204z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C41E3A] transition-colors"
                    aria-label="TikTok"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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

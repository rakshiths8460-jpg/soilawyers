'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about-us' },
  { label: 'EVENTS', href: '/events' },
  { label: 'BLOGS', href: '/blogs' },
  { label: 'THE TEAM', href: '/the-team' },
  { label: 'CONTACT', href: '/#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Editorial Publication Masthead */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-institutional-950/90 backdrop-blur-md hairline-b py-3 sm:py-3.5 shadow-2xl'
            : 'bg-institutional-950/60 backdrop-blur-sm hairline-b py-4 sm:py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Institutional Crest & Masthead Name */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-bronze-400/40 bg-institutional-900 flex-shrink-0 p-0.5 group-hover:border-bronze-300 transition-colors">
              <Image
                src="/images/logo_sil.png"
                alt="Society of Indian Lawyers Seal"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-bronze-300 transition-colors">
                  Society of Indian Lawyers
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-sans font-semibold tracking-wider uppercase text-bronze-400/90 border border-bronze-400/30 bg-bronze-400/5">
                  SIL
                </span>
              </div>
              <span className="text-[10px] tracking-[0.16em] uppercase text-slate-400 font-sans hidden md:inline-block">
                Learned Legal Society · Act XXI of 1860
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : item.href.startsWith('/#')
                  ? false
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[11px] font-sans font-medium tracking-[0.18em] uppercase transition-colors relative py-1 group ${
                    isActive
                      ? 'text-bronze-300 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeMastheadIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-bronze-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-bronze-300 transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* Action & Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-slate-100 bg-white/[0.04] border border-white/15 hover:border-bronze-400/60 hover:text-bronze-300 hover:bg-bronze-400/10 transition-all duration-300 active:scale-[0.98] group"
            >
              <span>Secretariat Inquiries</span>
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 text-slate-400 group-hover:text-bronze-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded border border-white/10 bg-institutional-900/80 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-institutional-950/98 backdrop-blur-2xl hairline-b px-6 py-8 lg:hidden flex flex-col space-y-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item, idx) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : item.href.startsWith('/#')
                    ? false
                    : pathname.startsWith(item.href);

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2.5 rounded text-sm font-sans tracking-[0.15em] uppercase transition-colors ${
                        isActive
                          ? 'text-bronze-300 font-semibold bg-white/5 border-l-2 border-bronze-400'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 rounded text-xs font-semibold uppercase tracking-[0.14em] text-institutional-950 bg-bronze-400 hover:bg-bronze-300 transition-colors"
              >
                <span>Connect With Secretariat</span>
                <ArrowUpRight className="ml-1.5 w-4 h-4" />
              </Link>
              <div className="text-[11px] text-center text-slate-500 font-sans tracking-wide">
                Societies Registration Act, 1860 · HQ Chandigarh
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Floating Island Navigation Architecture */}
      <header className="fixed top-4 sm:top-6 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-5xl mx-auto floating-island rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-500 ease-spring">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold-400/50 bg-legal-900 p-0.5 group-hover:border-gold-300 transition-colors">
              <Image
                src="/images/logo_sil.png"
                alt="Society of Indian Lawyers Seal"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-gold-300 transition-colors">
                SIL
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-gold-400 font-medium hidden md:inline-block">
                Society of Indian Lawyers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
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
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 relative ${
                    isActive
                      ? 'text-gold-300 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeFloatingIndicator"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-gold-400/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Button-in-Button CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-3">
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center pl-4 pr-1.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-legal-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-md transition-all duration-300 active:scale-[0.98] group"
            >
              <span>Get in Touch</span>
              <span className="w-6 h-6 rounded-full bg-legal-950/15 flex items-center justify-center ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-legal-950" />
              </span>
            </Link>

            {/* Mobile Hamburger Morph */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-legal-900/80 border border-white/10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`w-5 h-0.5 bg-slate-200 rounded-full transition-all duration-300 ease-spring ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2 bg-gold-300' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-slate-200 rounded-full transition-all duration-300 ease-spring ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-slate-200 rounded-full transition-all duration-300 ease-spring ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-gold-300' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Staggered Glass Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/90 pt-24 px-6 md:hidden flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col space-y-3 pt-6">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-5 py-3 rounded-xl text-base font-serif font-bold tracking-wider uppercase transition-all ${
                      pathname === item.href
                        ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-legal-950 bg-gradient-to-r from-gold-300 to-gold-400 shadow-xl"
              >
                <span>Connect With SIL Secretariat</span>
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

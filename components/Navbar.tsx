'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Scale } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about-us' },
  { label: 'EVENTS', href: '/events' },
  { label: 'BLOGS', href: '/blogs' },
  { label: 'THE TEAM', href: '/the-team' },
  { label: 'CONTACT US', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-legal-950/90 backdrop-blur-md border-b border-legal-800/80 py-3 shadow-xl'
            : 'bg-gradient-to-b from-legal-950/95 via-legal-950/70 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500/60 p-0.5 bg-legal-900 group-hover:border-gold-400 transition-colors shadow-lg">
                <Image
                  src="/images/logo_sil.png"
                  alt="Society of Indian Lawyers Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-gold-300 transition-colors">
                  SIL
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gold-400 font-medium hidden sm:inline-block">
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
                    className={`px-3 py-2 rounded-md text-xs lg:text-sm font-semibold tracking-wider uppercase transition-all duration-200 relative ${
                      isActive
                        ? 'text-gold-300 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-legal-800/40'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <Link
                href="/#contact"
                className="hidden lg:inline-flex items-center px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider text-legal-950 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-md hover:shadow-gold-500/20 transition-all duration-200"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-legal-800/60 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-legal-950/98 border-b border-legal-800 p-6 md:hidden backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors ${
                    pathname === item.href
                      ? 'bg-legal-800/80 text-gold-300 border-l-4 border-gold-400'
                      : 'text-slate-200 hover:bg-legal-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-legal-800">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-3 rounded-md text-sm font-semibold uppercase tracking-wider text-legal-950 bg-gradient-to-r from-gold-400 to-gold-300 shadow-md"
                >
                  <span>Connect With SIL</span>
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

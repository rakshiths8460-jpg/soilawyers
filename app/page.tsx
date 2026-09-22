'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Scale,
  Shield,
  BookOpen,
  Users,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import ContactSection from '@/components/ContactSection';
import GsapHeroEffects from '@/components/GsapHeroEffects';
import { SIL_ABOUT_DATA, SIL_EVENTS, SIL_BLOGS } from '@/data/siteData';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-legal-950">
        <GsapHeroEffects />
        
        {/* Background Image with Layered Vignettes */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_law.jpg"
            alt="Society of Indian Lawyers Emblem"
            fill
            className="object-cover object-center opacity-20 scale-105 gsap-hero-bg"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-legal-950 via-legal-950/85 to-legal-950/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 text-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-300 bezel-shell mb-8 gsap-float"
          >
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-gold-400">
              <Image src="/images/logo_sil.png" alt="SIL" fill className="object-cover" />
            </div>
            <span>Societies Registration Act, 1860 • HQ Chandigarh</span>
          </motion.div>

          {/* Main Hero Typography */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Society of <span className="gold-gradient-text">Indian Lawyers</span>
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-gold-200/90 font-light italic max-w-3xl mx-auto">
              Advancing the rule of law, legal education, and professional collaboration across jurisdictions.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A non-political, not-for-profit learned society uniting lawyers, academicians, and scholars in strengthening the Indian legal system and its engagement with international legal standards.
            </p>

            {/* Button-in-Button Action Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/about-us"
                className="w-full sm:w-auto inline-flex items-center justify-center pl-6 pr-2 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-legal-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 transition-all duration-300 active:scale-[0.98] group shadow-xl"
              >
                <span>Discover About SIL</span>
                <span className="w-7 h-7 rounded-full bg-legal-950/15 flex items-center justify-center ml-3 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-legal-950" />
                </span>
              </Link>

              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-white/10 hover:bg-white/5 transition-all duration-300 active:scale-[0.98]"
              >
                <span>View Past Events</span>
              </Link>
            </div>
          </motion.div>

          {/* Minimalist Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-20 pt-12 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">2024</span>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Founded In</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">1860</span>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Statutory Act</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">Pan-India</span>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Jurisdiction</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">Pro Bono</span>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Legal Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* ASYMMETRIC BENTO: MANDATE & OBJECTIVES */}
      <section className="py-28 sm:py-36 bg-legal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
              Constitutional Framework
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-3">
              Mission, Vision & Objectives
            </h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
          </div>

          {/* Asymmetric Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento 1: Primary Mission (Spans 2 cols) */}
            <div className="md:col-span-2 bezel-shell">
              <div className="bezel-core p-8 sm:p-10 h-full flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-6">
                    <Scale className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-widest block mb-2">
                    Core Mission
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {SIL_ABOUT_DATA.mission.description}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-4 border-t border-white/5">
                  Promoting legal excellence through continuous scholarship, cross-jurisdictional dialogue, and professional exchange.
                </p>
              </div>
            </div>

            {/* Bento 2: Vision */}
            <div className="bezel-shell">
              <div className="bezel-core p-8 sm:p-10 h-full flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-6">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-widest block mb-2">
                    Global Vision
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                    {SIL_ABOUT_DATA.vision.description}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 pt-4 border-t border-white/5">
                  Connecting Indian jurisprudence with global standards.
                </p>
              </div>
            </div>

            {/* Bento 3, 4, 5: Objectives in Asymmetric Columns */}
            {SIL_ABOUT_DATA.objectives.slice(0, 3).map((obj) => (
              <div key={obj.id} className="bezel-shell">
                <div className="bezel-core p-6 sm:p-8 h-full flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-gold-400">{obj.number}</span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">Clause</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">{obj.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{obj.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/about-us"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-gold-400 hover:text-gold-300 transition-colors group"
            >
              <span>Explore all 5 founding objectives & history</span>
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* RECENT EVENTS GALLERY TEASER */}
      <section className="py-28 bg-gradient-to-b from-legal-950 via-legal-900 to-legal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div>
              <span className="rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
                Archival Record
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3">
                Some Past Events
              </h2>
            </div>
            <Link
              href="/events"
              className="mt-4 md:mt-0 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-gold-200 group"
            >
              <span>View All 6 Archive Photos</span>
              <ArrowUpRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SIL_EVENTS.slice(0, 3).map((evt) => (
              <div key={evt.id} className="bezel-shell group">
                <div className="bezel-core overflow-hidden flex flex-col h-full">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-legal-950 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-legal-950 bg-gold-400">
                      {evt.category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                        {evt.caption}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{evt.date}</span>
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactSection />
    </div>
  );
}

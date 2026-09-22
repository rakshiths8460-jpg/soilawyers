'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Scale,
  Shield,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Linkedin,
  MapPin,
  ExternalLink
} from 'lucide-react';
import ContactSection from '@/components/ContactSection';
import GsapHeroEffects from '@/components/GsapHeroEffects';
import { SIL_ABOUT_DATA, SIL_EVENTS, SIL_BLOGS } from '@/data/siteData';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <GsapHeroEffects />
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-legal-950 via-legal-900 to-legal-950">
        {/* Hero Background Image with Refined Contrast Gradients */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_law.jpg"
            alt="Society of Indian Lawyers Emblem & Gavel"
            fill
            className="object-cover object-center opacity-25 scale-105 gsap-hero-bg"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-legal-950 via-legal-950/80 to-legal-950/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          {/* Official Crest Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 px-4 py-2 rounded-full glass-panel-gold mb-8 shadow-2xl gsap-float"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gold-400">
              <Image
                src="/images/logo_sil.png"
                alt="SIL Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs uppercase font-semibold tracking-widest text-gold-300">
              Societies Registration Act, 1860 • Headquarters Chandigarh
            </span>
          </motion.div>

          {/* Main Hero Typography */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Society of <span className="gold-gradient-text">Indian Lawyers</span>
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-gold-200/90 font-light italic max-w-3xl mx-auto">
              Advancing the rule of law, legal education, and professional collaboration across jurisdictions.
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A non-political, not-for-profit learned society uniting lawyers, academicians, and scholars in strengthening the Indian legal system and its engagement with international standards.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/about-us"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-legal-950 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-xl shadow-gold-500/20 transition-all duration-300 flex items-center justify-center group"
              >
                <span>Discover About SIL</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/events"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white glass-panel hover:bg-legal-800/80 border border-slate-700/80 transition-all duration-300 flex items-center justify-center"
              >
                <span>View Past Events</span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-12 border-t border-legal-800/60"
          >
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">2024</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Founded In</p>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">1860</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Act of Parliament</p>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">Pan-India</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Jurisdiction Reach</p>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">Pro Bono</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Justice Access</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION, VISION & PILLARS SECTION */}
      <section className="py-24 bg-legal-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              Mission & Strategic Vision
            </h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Mission Card */}
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border-l-4 border-gold-400 hover:border-gold-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {SIL_ABOUT_DATA.mission.description}
              </p>
            </div>

            {/* Vision Card */}
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border-l-4 border-gold-400 hover:border-gold-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {SIL_ABOUT_DATA.vision.description}
              </p>
            </div>
          </div>

          {/* Core Objectives List */}
          <div className="bg-legal-900/60 rounded-3xl p-8 sm:p-12 border border-legal-800">
            <div className="max-w-3xl mb-8">
              <h3 className="font-serif text-2xl font-bold text-white">
                Mandated Objectives
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Defined under the founding constitution of the Society of Indian Lawyers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SIL_ABOUT_DATA.objectives.slice(0, 3).map((obj) => (
                <div key={obj.id} className="p-6 rounded-xl bg-legal-950/60 border border-legal-800 space-y-3">
                  <span className="font-serif text-xl font-bold text-gold-400">{obj.number}</span>
                  <h4 className="font-serif text-lg font-bold text-white">{obj.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{obj.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/about-us"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
              >
                <span>Read all 5 founding objectives & history</span>
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PAST EVENTS SHOWCASE TEASER */}
      <section className="py-24 bg-gradient-to-b from-legal-950 via-legal-900 to-legal-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                Archival Gallery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
                Some Past Events
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Glimpses from legal conclaves, symposia, and Bar assemblies.
              </p>
            </div>

            <Link
              href="/events"
              className="mt-4 md:mt-0 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-gold-200 transition-colors"
            >
              <span>Explore All Photographs</span>
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>

          {/* 3 Featured Real Event Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SIL_EVENTS.slice(0, 3).map((evt) => (
              <Link
                key={evt.id}
                href="/events"
                className="group block rounded-2xl overflow-hidden glass-panel border border-legal-800 hover:border-gold-500/50 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-legal-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-legal-950 bg-gold-400/90 shadow">
                    {evt.category}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {evt.caption}
                  </p>
                  <div className="pt-2 text-[11px] text-slate-500 flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>{evt.date}</span>
                    <span>•</span>
                    <span>{evt.venue}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS & PUBLICATIONS TEASER */}
      <section className="py-20 bg-legal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                Thought Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
                Recent Publications & Articles
              </h2>
            </div>
            <Link
              href="/blogs"
              className="mt-4 md:mt-0 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-gold-200"
            >
              <span>View All Blogs</span>
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SIL_BLOGS.slice(0, 2).map((b) => (
              <div
                key={b.id}
                className="glass-panel p-8 rounded-2xl border border-legal-800 hover:border-gold-500/40 transition-colors space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-gold-400">
                  <span className="font-semibold uppercase tracking-wider">{b.category}</span>
                  <span className="text-slate-400">{b.readTime}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white hover:text-gold-300 transition-colors">
                  <Link href="/blogs">{b.title}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {b.excerpt}
                </p>
                <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-legal-800">
                  <span>{b.author}</span>
                  <Link href="/blogs" className="text-gold-400 hover:text-gold-300 font-semibold flex items-center">
                    Read Article <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL CONTACT US SECTION */}
      <ContactSection />
    </div>
  );
}

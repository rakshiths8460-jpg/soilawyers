'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Scale, Shield, Compass, Landmark } from 'lucide-react';
import ContactSection from '@/components/ContactSection';
import GsapHeroEffects from '@/components/GsapHeroEffects';
import InteractiveObjectives from '@/components/InteractiveObjectives';
import InteractiveArchiveSplit from '@/components/InteractiveArchiveSplit';
import { SIL_ABOUT_DATA } from '@/data/siteData';

export default function HomePage() {
  return (
    <div className="space-y-0 relative">
      {/* Subtle Fixed Paper Grain / Texture */}
      <div className="editorial-grain" />

      {/* HERO SECTION: Asymmetrical Editorial Cover */}
      <section className="relative min-h-[92dvh] flex items-center justify-center overflow-hidden bg-institutional-950 pt-12 pb-20">
        <GsapHeroEffects />

        {/* Ambient Archival Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/hero_law.jpg"
            alt="Society of Indian Lawyers Seal"
            fill
            className="object-cover object-center opacity-10 scale-105 gsap-hero-bg filter grayscale contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-institutional-950 via-institutional-950/90 to-institutional-950/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,_var(--tw-gradient-stops))] from-bronze-400/[0.07] via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Institutional Statement & Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-justify"
            >
              {/* Eyebrow Label */}
              <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded bg-white/[0.03] border border-white/10 text-[10px] font-sans uppercase tracking-[0.22em] font-medium text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze-400" />
                <span>DC-RIA-RS/2024/00041 · Act XXI of 1860 · Chandigarh</span>
              </div>

              {/* Primary Display Title */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
                Advancing the Rule of Law, Legal Scholarship, &{' '}
                <span className="bronze-gradient-text">Bar Fraternity</span>
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl font-light">
                A non-political, not-for-profit learned society uniting advocates, jurists, and academicians across Indian and international jurisdictions.
              </p>

              {/* Architectural Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 font-sans">
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center px-6 py-3 rounded text-xs font-semibold uppercase tracking-[0.14em] text-institutional-950 bg-bronze-400 hover:bg-bronze-300 transition-all duration-200 active:scale-[0.98] group"
                >
                  <span>Explore Constitutional Charter</span>
                  <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/events"
                  className="inline-flex items-center justify-center px-5 py-3 rounded text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 border border-white/15 hover:border-bronze-400/50 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Archival Proceedings & Events</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Architectural Seal Presentation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
                {/* Concentric Architectural Halo Rings */}
                <div className="absolute inset-0 rounded-full border border-bronze-400/15 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-8 rounded-full border border-bronze-400/20" />
                <div className="absolute inset-12 rounded-full bg-institutional-900/60 backdrop-blur-sm shadow-seal" />

                {/* Society Seal */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-bronze-400/40 p-1 bg-institutional-950">
                  <Image
                    src="/images/logo_sil.png"
                    alt="Official Seal of the Society of Indian Lawyers"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Seal Annotation Badge */}
                <div className="absolute -bottom-3 px-3.5 py-1 rounded bg-institutional-900 border border-bronze-400/30 text-[9px] uppercase tracking-[0.2em] font-sans font-semibold text-bronze-300">
                  Society of Indian Lawyers · Estd. 2024
                </div>
              </div>
            </motion.div>
          </div>

          {/* Institutional Milestones Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-20 pt-10 hairline-t">
            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">2024</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-bronze-400 font-semibold block">
                Founding Year
              </span>
              <p className="text-xs text-slate-400 font-sans">
                Learned legal society headquartered at Chandigarh.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">Act XXI</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-bronze-400 font-semibold block">
                Statutory Charter
              </span>
              <p className="text-xs text-slate-400 font-sans">
                Registered under the Societies Registration Act, 1860.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">Pan-India</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-bronze-400 font-semibold block">
                Bar Jurisdiction
              </span>
              <p className="text-xs text-slate-400 font-sans">
                Representing advocates across High Courts & Supreme Court.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">Pro Bono</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-bronze-400 font-semibold block">
                Justice & Scholarship
              </span>
              <p className="text-xs text-slate-400 font-sans">
                Promoting legal aid, research, and young advocate mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Constitutional Mandate & Prospectus (Editorial Split) */}
      <section className="py-24 sm:py-32 bg-institutional-950 hairline-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] font-semibold text-bronze-400 block mb-2">
              Section 01 · Constitutional Framework
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Mandate & Global Prospectus
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Formulated to bridge the divide between courtroom practitioners, legal scholars, and judicial researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-stretch">
            {/* Split 1: Mandate */}
            <div className="monograph-card p-8 sm:p-10 rounded-lg flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 hairline-b">
                  <span className="font-serif text-2xl font-bold text-bronze-400">01 / MANDATE</span>
                  <Compass className="w-5 h-5 text-bronze-400" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  Core Mission of the Society
                </h3>
                <p className="text-sm sm:text-base text-slate-200 font-serif italic leading-relaxed pt-2">
                  &ldquo;{SIL_ABOUT_DATA.mission.description}&rdquo;
                </p>
              </div>

              <div className="pt-4 hairline-t text-xs text-slate-400 font-sans leading-relaxed">
                Dedicated to continuous Continuing Legal Education (CLE), high-table national symposia, and standard-setting in Indian courtroom advocacy.
              </div>
            </div>

            {/* Split 2: Prospectus */}
            <div className="monograph-card p-8 sm:p-10 rounded-lg flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 hairline-b">
                  <span className="font-serif text-2xl font-bold text-bronze-400">02 / PROSPECTUS</span>
                  <Shield className="w-5 h-5 text-bronze-400" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  Global Vision & Comparative Law
                </h3>
                <p className="text-sm sm:text-base text-slate-200 font-serif italic leading-relaxed pt-2">
                  &ldquo;{SIL_ABOUT_DATA.vision.description}&rdquo;
                </p>
              </div>

              <div className="pt-4 hairline-t text-xs text-slate-400 font-sans leading-relaxed">
                Facilitating international bilateral legal exchanges, cross-border commercial arbitration frameworks, and comparative constitutional research.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Charter of 5 Founding Objectives (Interactive Monograph) */}
      <section className="py-24 sm:py-32 bg-institutional-950 hairline-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] font-semibold text-bronze-400 block mb-2">
              Section 02 · Statutory Charter
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              The Five Founding Objectives
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Enacted under the constitutional charter of the Society of Indian Lawyers to foster continuous learning, public service, and professional integrity.
            </p>
          </div>

          <InteractiveObjectives />
        </div>
      </section>

      {/* SECTION 3: Curated Archival Proceedings (Interactive Split-Screen Gallery) */}
      <section className="py-24 sm:py-32 bg-institutional-950 hairline-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] font-semibold text-bronze-400 block mb-2">
              Section 03 · Institutional Proceedings
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Conclaves, Symposia & Assemblies
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              A chronological archive of national legal conclaves, judicial reform dialogues, and bilateral delegations convened under the Society&apos;s auspices.
            </p>
          </div>

          <InteractiveArchiveSplit />
        </div>
      </section>

      {/* SECTION 4: Official Secretariat & Inquiries */}
      <ContactSection />
    </div>
  );
}


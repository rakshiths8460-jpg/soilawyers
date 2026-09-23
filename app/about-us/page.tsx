import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Scale,
  Shield,
  Compass,
  Landmark,
  CheckCircle2,
  MapPin,
  ArrowRight,
  BookOpen,
  Globe,
  HeartHandshake
} from 'lucide-react';
import { SIL_ABOUT_DATA } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'About Us · Society of Indian Lawyers (SIL)',
  description:
    'Learn about the Society of Indian Lawyers (SIL), our mission, vision, 5 core objectives, and legal registration under the Societies Registration Act, 1860.',
};

const OBJECTIVE_ICONS = [
  Scale,
  BookOpen,
  HeartHandshake,
  Globe,
  Shield,
];

export default function AboutUsPage() {
  return (
    <div className="py-16 sm:py-24 bg-institutional-950 min-h-screen relative">
      <div className="editorial-grain" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
        {/* Editorial Masthead */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/[0.03] border border-white/10 text-[10px] font-sans uppercase tracking-[0.22em] font-medium text-bronze-400">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze-400" />
            <span>Constitutional Charter · DC-RIA-RS/2024/00041</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            About the Society
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-slate-200 italic leading-relaxed pt-1">
            &ldquo;Advancing the rule of law, legal education, and professional collaboration among members of the Indian and international legal fraternity.&rdquo;
          </p>
        </div>

        {/* Narrative Chapter 01: The Institution */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center hairline-t pt-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-bronze-400 font-semibold block">
              Chapter 01 · Institutional Identity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              The Society of Indian Lawyers
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>{SIL_ABOUT_DATA.intro}</p>
              <p>{SIL_ABOUT_DATA.whyExists.description}</p>
            </div>

            <div className="p-4 rounded bg-institutional-900/80 border border-white/10 space-y-1 text-xs font-sans">
              <span className="text-bronze-300 font-semibold block">Governance & Non-Partisan Mandate</span>
              <p className="text-slate-400">
                SIL operates strictly as a non-political, scholarly entity dedicated to jurisprudence, continuing legal education, and professional brotherhood.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="monograph-card p-6 rounded-lg w-full max-w-md text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-bronze-400/40 p-1 bg-institutional-950">
                <Image
                  src="/images/logo_sil.png"
                  alt="SIL Seal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-white">Official Insignia & Seal</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-bronze-400 block">
                  Registered Non-Profit Society · HQ Chandigarh
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Chapter 02: Mandate & Prospectus */}
        <section className="hairline-t pt-16 space-y-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-bronze-400 font-semibold block mb-2">
              Chapter 02 · Constitutional Mandate
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Mission & Global Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="monograph-card p-8 sm:p-10 rounded-lg space-y-4">
              <div className="flex items-center space-x-3 text-bronze-400">
                <Compass className="w-5 h-5" />
                <span className="text-[11px] font-sans uppercase tracking-widest font-semibold">
                  Core Mission
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {SIL_ABOUT_DATA.mission.title}
              </h3>
              <p className="text-sm text-slate-200 font-serif italic leading-relaxed">
                &ldquo;{SIL_ABOUT_DATA.mission.description}&rdquo;
              </p>
              <p className="text-xs text-slate-400 font-sans leading-relaxed pt-2">
                Promoting high trial standards, courtroom ethics, procedural consistency, and institutional independence.
              </p>
            </div>

            <div className="monograph-card p-8 sm:p-10 rounded-lg space-y-4">
              <div className="flex items-center space-x-3 text-bronze-400">
                <Shield className="w-5 h-5" />
                <span className="text-[11px] font-sans uppercase tracking-widest font-semibold">
                  Global Vision
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {SIL_ABOUT_DATA.vision.title}
              </h3>
              <p className="text-sm text-slate-200 font-serif italic leading-relaxed">
                &ldquo;{SIL_ABOUT_DATA.vision.description}&rdquo;
              </p>
              <p className="text-xs text-slate-400 font-sans leading-relaxed pt-2">
                Connecting Indian jurisprudence with global dispute resolution mechanisms, treaty law, and international arbitration.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Chapter 03: The 5 Founding Objectives */}
        <section id="objectives" className="hairline-t pt-16 space-y-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-bronze-400 font-semibold block mb-2">
              Chapter 03 · Statutory Enactments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              The Five Founding Objectives
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-2">
              Clauses enacted within the official Memorandum of Association of the Society of Indian Lawyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIL_ABOUT_DATA.objectives.map((obj, idx) => {
              const IconComp = OBJECTIVE_ICONS[idx] || Scale;
              return (
                <div key={obj.id} className="monograph-card p-6 sm:p-7 rounded-lg flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl font-bold text-bronze-400">
                        {obj.number}
                      </span>
                      <IconComp className="w-5 h-5 text-slate-500" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">
                      {obj.title}
                    </h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {obj.text}
                    </p>
                  </div>

                  <div className="pt-3 hairline-t flex items-center text-[10px] text-bronze-300 font-sans font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-bronze-400" />
                    <span>Statutory Constitutional Clause</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Narrative Chapter 04: Statutory Heritage */}
        <section id="history" className="hairline-t pt-16">
          <div className="monograph-card-highlight p-8 sm:p-12 rounded-lg space-y-6">
            <div className="flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-widest text-bronze-400">
              <Landmark className="w-4 h-4" />
              <span>Chapter 04 · Statutory Heritage & Incorporation</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {SIL_ABOUT_DATA.history.title}
            </h3>

            <p className="text-slate-200 text-xs sm:text-sm font-sans leading-relaxed max-w-4xl">
              {SIL_ABOUT_DATA.history.text}
            </p>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 hairline-t text-xs font-sans">
              <div>
                <span className="text-slate-400 uppercase tracking-wider block mb-1">Enacted Legislation</span>
                <span className="font-semibold text-white">Societies Registration Act, 1860 (Act XXI)</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider block mb-1">Inauguration</span>
                <span className="font-semibold text-white">Year 2024</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider block mb-1">Official Seat</span>
                <span className="font-semibold text-white">Headquarters at Chandigarh, India</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-[0.14em] text-institutional-950 bg-bronze-400 hover:bg-bronze-300 transition-colors"
              >
                <span>Direct Inquiries to Secretariat</span>
                <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 border border-white/15 hover:border-bronze-400/50 transition-colors"
              >
                <span>Explore Conference Archive</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Scale,
  Shield,
  Compass,
  Landmark,
  CheckCircle2,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { SIL_ABOUT_DATA } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'About SIL - Society of Indian Lawyers',
  description:
    'Learn about the Society of Indian Lawyers (SIL), our mission, vision, 5 core objectives, and legal registration under the Societies Registration Act, 1860.',
};

export default function AboutUsPage() {
  return (
    <div className="py-20 sm:py-28 bg-legal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="inline-block rounded-full px-4 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Learned Society • Founded 2024
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            About SIL
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-gold-300 italic max-w-3xl mx-auto leading-relaxed">
            &ldquo;Advancing the rule of law, legal education, and professional collaboration among members of the Indian and international legal fraternity.&rdquo;
          </p>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Narrative & Emblem Double-Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="bezel-shell">
              <div className="bezel-core p-8 sm:p-10 space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  The Society of Indian Lawyers
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {SIL_ABOUT_DATA.intro}
                </p>
              </div>
            </div>

            <div className="bezel-shell">
              <div className="bezel-core p-8 sm:p-10 space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-300">
                  {SIL_ABOUT_DATA.whyExists.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {SIL_ABOUT_DATA.whyExists.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bezel-shell aspect-square">
              <div className="bezel-core relative w-full h-full overflow-hidden p-2">
                <Image
                  src="/images/hero_law.jpg"
                  alt="SIL Seal"
                  fill
                  className="object-cover rounded-[calc(2rem-0.75rem)]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-legal-950 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                    Registered Non-Profit Society
                  </span>
                  <span className="font-serif text-xl font-bold text-white">
                    Chandigarh, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bezel-shell">
            <div className="bezel-core p-8 sm:p-10 h-full space-y-4">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {SIL_ABOUT_DATA.mission.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {SIL_ABOUT_DATA.mission.description}
              </p>
            </div>
          </div>

          <div className="bezel-shell">
            <div className="bezel-core p-8 sm:p-10 h-full space-y-4">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {SIL_ABOUT_DATA.vision.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {SIL_ABOUT_DATA.vision.description}
              </p>
            </div>
          </div>
        </div>

        {/* 5 Founding Objectives */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
              Constitutional Mandate
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3">
              Founding Objectives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SIL_ABOUT_DATA.objectives.map((obj) => (
              <div key={obj.id} className="bezel-shell">
                <div className="bezel-core p-6 h-full flex flex-col justify-between space-y-4">
                  <div>
                    <span className="font-serif text-3xl font-bold text-gold-400 block mb-2">
                      {obj.number}
                    </span>
                    <h4 className="font-serif text-base font-bold text-white mb-2">
                      {obj.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {obj.text}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex items-center text-[10px] text-gold-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    <span>Statutory Clause</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History & Legal Status */}
        <div className="bezel-shell max-w-5xl mx-auto">
          <div className="bezel-core-gold p-8 sm:p-12 space-y-6">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-gold-400">
              <Landmark className="w-4 h-4" />
              <span>Institutional Heritage</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {SIL_ABOUT_DATA.history.title}
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {SIL_ABOUT_DATA.history.text}
            </p>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 text-xs">
              <div>
                <span className="text-slate-400 uppercase tracking-wider block mb-1">Enactment</span>
                <span className="font-semibold text-white">Societies Registration Act, 1860</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider block mb-1">Founding</span>
                <span className="font-semibold text-white">Year 2024</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider block mb-1">Headquarters</span>
                <span className="font-semibold text-white">Chandigarh, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

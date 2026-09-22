import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Scale,
  Shield,
  BookOpen,
  Award,
  Users,
  Compass,
  Landmark,
  Building,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
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
    <div className="py-12 sm:py-20 bg-legal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Learned Society • Founded 2024
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            About SIL
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-gold-300 italic max-w-3xl mx-auto">
            &ldquo;Advancing the rule of law, legal education, and professional collaboration among members of the Indian and international legal fraternity.&rdquo;
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto pt-2" />
        </div>

        {/* Narrative & Emblem Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border-l-4 border-gold-400 space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                The Society of Indian Lawyers
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {SIL_ABOUT_DATA.intro}
              </p>
            </div>

            <div className="glass-panel p-8 sm:p-10 rounded-2xl space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-300">
                {SIL_ABOUT_DATA.whyExists.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {SIL_ABOUT_DATA.whyExists.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel border-2 border-gold-500/30 p-2 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-legal-900">
                <Image
                  src="/images/hero_law.jpg"
                  alt="SIL Emblem & Justice Gavel"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-legal-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-1">
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
          {/* Mission */}
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-legal-800 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              {SIL_ABOUT_DATA.mission.title}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {SIL_ABOUT_DATA.mission.description}
            </p>
          </div>

          {/* Vision */}
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-legal-800 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              {SIL_ABOUT_DATA.vision.title}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {SIL_ABOUT_DATA.vision.description}
            </p>
          </div>
        </div>

        {/* Objectives Section - The 5 Authentic Mandates */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Constitutional Mandate
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              Founding Objectives
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              The fundamental objectives guiding all projects, conferences, and representations of SIL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SIL_ABOUT_DATA.objectives.map((obj) => (
              <div
                key={obj.id}
                className="glass-panel p-6 rounded-2xl border border-legal-800 hover:border-gold-500/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-gold-400 block mb-2">
                    {obj.number}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mb-2">
                    {obj.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {obj.text}
                  </p>
                </div>
                <div className="pt-2 border-t border-legal-800/60 flex items-center text-[11px] text-gold-400">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>Mandated Clause</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History & Legal Status */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-gold-400">
              <Landmark className="w-4 h-4" />
              <span>Institutional Heritage</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {SIL_ABOUT_DATA.history.title}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {SIL_ABOUT_DATA.history.text}
            </p>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-legal-800">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Legal Act</span>
                <span className="text-sm font-semibold text-white">Societies Registration Act, 1860</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Founding Year</span>
                <span className="text-sm font-semibold text-white">2024</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Headquarters</span>
                <span className="text-sm font-semibold text-white">Chandigarh, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, ArrowUpRight, Sparkles, Maximize2 } from 'lucide-react';
import { SIL_EVENTS } from '@/data/siteData';

export default function InteractiveArchiveSplit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = SIL_EVENTS[activeIndex] || SIL_EVENTS[0];

  return (
    <div className="space-y-10">
      {/* Decadal Flagship Conference Feature Banner: IBC TURNS 10 */}
      <div className="monograph-card-highlight p-6 sm:p-8 lg:p-10 rounded-lg relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] uppercase tracking-widest font-sans font-semibold text-bronze-300 bg-bronze-400/10 border border-bronze-400/30">
              <Sparkles className="w-3.5 h-3.5 text-bronze-400" />
              <span>Upcoming Decadal Conference · 24 October 2026</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              IBC TURNS 10: <span className="italic text-bronze-300">2016 – 2026</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-2xl">
              Marking 10 years of the Insolvency & Bankruptcy Code, the law that rewrote India&apos;s credit culture. Convening judges, senior counsel, regulators, resolution professionals, and bankers at Chandigarh.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-sans text-slate-300">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-bronze-400" />
                <span>24 October 2026</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-bronze-400" />
                <span>Chandigarh, India</span>
              </div>
              <div className="flex items-center space-x-1.5 text-bronze-300 font-medium">
                <span>200+ Accredited Delegates</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/events/ibc-turns-10"
                className="inline-flex items-center px-5 py-2.5 rounded text-xs font-sans font-semibold uppercase tracking-[0.14em] text-institutional-950 bg-bronze-400 hover:bg-bronze-300 transition-all duration-300 active:scale-[0.98] group"
              >
                <span>Conference Program & Registration</span>
                <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 text-center lg:text-right hairline-t lg:hairline-t-0 lg:hairline-l pt-6 lg:pt-0 lg:pl-8">
            <div className="font-serif text-7xl sm:text-8xl font-bold text-bronze-300/80 leading-none">
              10
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-300 font-serif block mt-1">
              Years of Resolution & Reform
            </span>
            <span className="text-[11px] text-bronze-400 font-sans block mt-1">
              Conveners: Suvir Sidhu · Komal Abrol
            </span>
          </div>
        </div>
      </div>

      {/* Split-Screen Interactive Archive Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Chronological List of Events */}
        <div className="lg:col-span-6 space-y-2.5">
          <div className="flex items-center justify-between pb-2 mb-2 hairline-b">
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-slate-400 font-semibold">
              Chronological Proceedings
            </span>
            <span className="text-[11px] font-sans text-bronze-400">
              6 Archival Records
            </span>
          </div>

          {SIL_EVENTS.map((evt, idx) => {
            const isSelected = activeIndex === idx;

            return (
              <div
                key={evt.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`p-4 rounded cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-institutional-900/90 border-bronze-400/40 text-white'
                    : 'bg-white/[0.015] border-white/5 text-slate-300 hover:border-white/15 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[9px] font-sans font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-bronze-300">
                        {evt.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans">
                        {evt.date}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-slate-100 leading-snug">
                      {evt.title}
                    </h4>

                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-sans">
                      <MapPin className="w-3 h-3 text-bronze-400 flex-shrink-0" />
                      <span className="truncate max-w-[280px] sm:max-w-md">{evt.venue}</span>
                    </div>
                  </div>

                  <div className="pt-1 flex-shrink-0">
                    <span
                      className={`text-xs transition-colors ${
                        isSelected ? 'text-bronze-300 font-bold' : 'text-slate-600'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Dynamic Photographic Preview */}
        <div className="lg:col-span-6 lg:sticky lg:top-28">
          <div className="monograph-card rounded-lg overflow-hidden border border-white/10">
            <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-institutional-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeEvent.image}
                    alt={activeEvent.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-institutional-950 via-institutional-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded text-[10px] font-sans font-semibold uppercase tracking-wider text-institutional-950 bg-bronze-400 shadow">
                    {activeEvent.category}
                  </div>

                  <div className="absolute bottom-4 inset-x-4 space-y-1.5">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-bronze-300 block">
                      Archival Record · {activeEvent.date}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white leading-snug">
                      {activeEvent.title}
                    </h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-2">
                      {activeEvent.caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-4 sm:p-5 flex items-center justify-between bg-institutional-950/90 text-xs font-sans">
              <div className="flex items-center space-x-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-bronze-400" />
                <span className="truncate max-w-[200px] sm:max-w-xs">{activeEvent.venue}</span>
              </div>

              <Link
                href="/events"
                className="inline-flex items-center text-bronze-300 hover:text-white font-medium uppercase tracking-wider text-[11px] transition-colors group"
              >
                <span>Full Archive</span>
                <ArrowUpRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

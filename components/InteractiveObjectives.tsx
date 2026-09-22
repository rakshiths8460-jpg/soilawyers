'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Scale, Shield, BookOpen, HeartHandshake, Globe } from 'lucide-react';
import { SIL_ABOUT_DATA } from '@/data/siteData';

const OBJECTIVE_ICONS = [
  Scale,
  BookOpen,
  HeartHandshake,
  Globe,
  Shield,
];

export default function InteractiveObjectives() {
  const [activeIndex, setActiveIndex] = useState(0);
  const objectives = SIL_ABOUT_DATA.objectives;
  const current = objectives[activeIndex];
  const CurrentIcon = OBJECTIVE_ICONS[activeIndex] || Scale;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left: Interactive List */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-2">
        {objectives.map((obj, idx) => {
          const isSelected = activeIndex === idx;
          const IconComponent = OBJECTIVE_ICONS[idx] || Scale;

          return (
            <div
              key={obj.id}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`p-4 sm:p-5 rounded cursor-pointer transition-all duration-300 relative border ${
                isSelected
                  ? 'bg-institutional-900/90 border-bronze-400/40 text-white shadow-lg'
                  : 'bg-white/[0.015] border-white/5 text-slate-300 hover:border-white/15 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span
                    className={`font-serif text-lg sm:text-xl font-bold transition-colors ${
                      isSelected ? 'text-bronze-300' : 'text-slate-500'
                    }`}
                  >
                    {obj.number}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-serif text-base sm:text-lg font-semibold tracking-tight text-slate-100">
                      {obj.title}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-slate-400">
                      Constitutional Clause {obj.number}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-bronze-400/15 text-bronze-300'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isSelected ? 'rotate-90 text-bronze-400' : 'text-slate-600'
                    }`}
                  />
                </div>
              </div>

              {/* Mobile expanded preview */}
              <div className="lg:hidden mt-3 pt-3 hairline-t text-xs text-slate-300 font-sans leading-relaxed">
                {obj.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Focused Detail Monograph Panel (Desktop) */}
      <div className="hidden lg:block lg:col-span-5">
        <div className="monograph-card-highlight h-full p-8 rounded flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded bg-bronze-400/15 border border-bronze-400/30 flex items-center justify-center text-bronze-300">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-bold text-bronze-400 block leading-none">
                    {current.number}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-slate-400">
                    Statutory Clause
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-bronze-400 font-semibold block mb-2">
                  Founding Mandate
                </span>
                <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                  {current.title}
                </h3>
              </div>

              <div className="p-4 rounded bg-institutional-950/80 border border-white/5">
                <p className="text-sm text-slate-200 font-serif italic leading-relaxed">
                  &ldquo;{current.text}&rdquo;
                </p>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Ratified within the Memorandum of Association registered under Act XXI of 1860. The Society systematically executes this clause through accredited assemblies, publications, and judicial representations.
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="pt-6 hairline-t flex items-center justify-between text-[11px] text-slate-400 font-sans">
            <div className="flex items-center space-x-1.5 text-bronze-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-bronze-400" />
              <span>Charter of the Society</span>
            </div>
            <span>Estd. 2024 · Chandigarh</span>
          </div>
        </div>
      </div>
    </div>
  );
}

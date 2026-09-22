'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Maximize2, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import GalleryLightbox, { GalleryItem } from '@/components/GalleryLightbox';
import { SIL_EVENTS } from '@/data/siteData';

const CATEGORIES = ['All', 'National Conference', 'Seminar', 'Roundtable', 'Delegation'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredEvents = selectedCategory === 'All'
    ? SIL_EVENTS
    : SIL_EVENTS.filter((e) => e.category === selectedCategory);

  const lightboxItems: GalleryItem[] = filteredEvents.map((e) => ({
    id: e.id,
    src: e.image,
    title: e.title,
    caption: e.caption,
    category: e.category,
    date: e.date,
    venue: e.venue,
  }));

  return (
    <div className="py-16 sm:py-24 bg-institutional-950 min-h-screen relative">
      <div className="editorial-grain" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* PREMIER FEATURED DECADAL EVENT: IBC TURNS 10 */}
        <div className="monograph-card-highlight p-8 sm:p-12 rounded-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] uppercase tracking-widest font-sans font-semibold text-bronze-300 bg-bronze-400/10 border border-bronze-400/30">
                <Sparkles className="w-3.5 h-3.5 text-bronze-400" />
                <span>Featured Decadal Assembly · 24 October 2026</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                IBC TURNS 10: <span className="italic text-bronze-300">2016 – 2026</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-sans font-light">
                A decade of the Insolvency & Bankruptcy Code. Marking 10 years of the law that rewrote India&apos;s credit culture. Bringing together judges, senior counsel, regulators, resolution professionals, and bankers at Chandigarh.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-sans">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-bronze-400" />
                  <span>24 October 2026</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-bronze-400" />
                  <span>Chandigarh, India</span>
                </div>
                <div className="flex items-center space-x-1.5 font-medium text-bronze-300">
                  <span>200+ Accredited Delegates</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/events/ibc-turns-10"
                  className="inline-flex items-center px-6 py-3 rounded text-xs font-semibold uppercase tracking-[0.14em] bg-bronze-400 text-institutional-950 hover:bg-bronze-300 transition-all font-sans group shadow-xl"
                >
                  <span>Conference Program & Registration</span>
                  <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Visual Callout */}
            <div className="lg:col-span-4 text-center lg:text-right hairline-t lg:hairline-t-0 lg:hairline-l pt-6 lg:pt-0 lg:pl-8">
              <div className="font-serif text-8xl font-bold text-bronze-300/80 leading-none">10</div>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-300 font-serif block mt-2">
                Years of Resolution & Reform
              </span>
              <span className="text-[11px] text-bronze-400 font-sans block mt-1">Conveners: Suvir Sidhu · Komal Abrol</span>
            </div>
          </div>
        </div>

        {/* SECTION: Photographic Gazette & Archival Records */}
        <div className="space-y-12 hairline-t pt-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-bronze-400 font-semibold block">
              Section 02 · Archival Gazette
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Photographic Records & Proceedings
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
              A visual retrospective of national conclaves, high-table symposia, and Bar assemblies organized under the auspices of the Society of Indian Lawyers.
            </p>
          </div>

          {/* Minimalist Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-[11px] font-sans font-semibold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-bronze-400 text-institutional-950 font-bold'
                    : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Archival Gazette Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt, idx) => (
              <div key={evt.id} className="monograph-card rounded-lg overflow-hidden flex flex-col justify-between group">
                <div>
                  <div
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="relative h-64 overflow-hidden cursor-pointer bg-institutional-900"
                  >
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-institutional-950 via-transparent to-transparent opacity-85" />
                    
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded text-[10px] font-sans font-semibold uppercase tracking-wider text-institutional-950 bg-bronze-400 shadow">
                      {evt.category}
                    </span>

                    <div className="absolute top-4 right-4 p-2 rounded bg-institutional-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3
                      onClick={() => setActiveLightboxIndex(idx)}
                      className="font-serif text-lg font-bold text-white group-hover:text-bronze-300 transition-colors cursor-pointer"
                    >
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                      {evt.caption}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 hairline-t flex items-center justify-between text-[11px] text-slate-400 font-sans">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-bronze-400" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-bronze-400" />
                    <span className="truncate max-w-[130px]">{evt.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <GalleryLightbox
            items={lightboxItems}
            selectedIndex={activeLightboxIndex}
            onClose={() => setActiveLightboxIndex(null)}
            onSelect={(index) => setActiveLightboxIndex(index)}
          />
        </div>
      </div>
    </div>
  );
}

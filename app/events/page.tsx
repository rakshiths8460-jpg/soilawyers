'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Maximize2, Tag, Filter } from 'lucide-react';
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
    <div className="py-12 sm:py-20 bg-legal-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Title matching original header: "Some Past Events" */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Photographic Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Some Past Events
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A visual retrospective of national conclaves, high-table symposia, and Bar assemblies organized under the auspices of the Society of Indian Lawyers.
          </p>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-400 text-legal-950 font-bold shadow-lg shadow-gold-500/20'
                  : 'bg-legal-900 text-slate-300 hover:text-white hover:bg-legal-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel rounded-2xl overflow-hidden border border-legal-800 hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="relative h-64 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-legal-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-legal-950 bg-gold-400/90 shadow">
                    {evt.category}
                  </span>

                  {/* Zoom Icon Button */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-legal-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors cursor-pointer"
                  >
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {evt.caption}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-legal-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span className="truncate max-w-[140px]">{evt.venue}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox */}
        <GalleryLightbox
          items={lightboxItems}
          selectedIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
          onSelect={(index) => setActiveLightboxIndex(index)}
        />
      </div>
    </div>
  );
}

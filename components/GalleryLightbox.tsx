'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Calendar, MapPin } from 'lucide-react';

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: string;
  date?: string;
  venue?: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  selectedIndex,
  onClose,
  onSelect,
}: GalleryLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelect((selectedIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onSelect((selectedIndex - 1 + items.length) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items.length, onClose, onSelect]);

  if (selectedIndex === null) return null;

  const current = items[selectedIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between text-white z-10">
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              SIL Archive Photograph
            </span>
            <span className="text-slate-400 text-xs">
              {selectedIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-legal-900/80 hover:bg-gold-500 hover:text-legal-950 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Image Display with Navigation Arrows */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          <button
            onClick={() => onSelect((selectedIndex - 1 + items.length) % items.length)}
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-legal-900/80 hover:bg-gold-500 hover:text-legal-950 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
            <Image
              src={current.src}
              alt={current.title}
              fill
              className="object-contain select-none"
              priority
            />
          </div>

          <button
            onClick={() => onSelect((selectedIndex + 1) % items.length)}
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-legal-900/80 hover:bg-gold-500 hover:text-legal-950 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Details & Thumbnails */}
        <div className="max-w-4xl mx-auto w-full z-10 text-center space-y-4">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white">{current.title}</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl mx-auto">{current.caption}</p>
          </div>

          {/* Thumbnails strip */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto py-2">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => onSelect(idx)}
                className={`relative w-14 h-10 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                  idx === selectedIndex ? 'border-gold-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={item.src} alt={item.title} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

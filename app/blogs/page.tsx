import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BLOGS | SIL - Society of Indian Lawyers',
  description: 'Society of Indian Lawyers (SIL) - Blogs',
};

export default function BlogsPage() {
  return (
    <div className="py-28 sm:py-36 bg-legal-950 min-h-[75vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
        <span className="inline-block rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
          Society of Indian Lawyers
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
          BLOGS
        </h1>
        <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
        <p className="font-serif text-xl sm:text-2xl text-gold-300 italic pt-2">
          Publications Coming Soon
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-gold-300 transition-colors"
          >
            <span>Back to Home</span>
            <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

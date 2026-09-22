import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Publications & Blogs · Society of Indian Lawyers',
  description: 'Society of Indian Lawyers (SIL) - Legal Publications & Scholarship',
};

export default function BlogsPage() {
  return (
    <div className="py-28 sm:py-36 bg-institutional-950 min-h-[75vh] flex items-center justify-center relative">
      <div className="editorial-grain" />

      <div className="max-w-2xl mx-auto px-4 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/[0.03] border border-white/10 text-[10px] font-sans uppercase tracking-[0.22em] font-medium text-bronze-400">
          <span className="w-1.5 h-1.5 rounded-full bg-bronze-400" />
          <span>Society of Indian Lawyers · Research Cell</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Legal Publications
        </h1>

        <p className="font-serif text-xl sm:text-2xl text-slate-200 italic pt-1">
          Publications Coming Soon
        </p>

        <p className="text-xs text-slate-400 font-sans max-w-md mx-auto leading-relaxed">
          The editorial research committee is preparing the inaugural volume of essays and comparative law treatises.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-sans font-semibold uppercase tracking-[0.14em] text-slate-400 hover:text-bronze-300 transition-colors"
          >
            <span>Back to Home</span>
            <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

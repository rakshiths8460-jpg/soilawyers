import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BLOGS - Society of Indian Lawyers',
  description:
    'Scholarly publications and legal commentaries from the Society of Indian Lawyers (SIL).',
};

export default function BlogsPage() {
  return (
    <div className="py-20 sm:py-32 bg-legal-950 min-h-[85vh] flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12 text-center">
        {/* Header matching original title: "BLOGS | SIL" */}
        <div className="space-y-4">
          <span className="inline-block rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Scholarly Publications & Analysis
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            BLOGS | SIL
          </h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Double-Bezel Coming Soon Card */}
        <div className="bezel-shell">
          <div className="bezel-core p-8 sm:p-14 space-y-8">
            <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
                Editorial Review in Progress
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Publications Coming Soon
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                Our editorial cell and academic research fellows are preparing inaugural commentaries, policy briefs, and legal scholarship on contemporary Indian jurisprudence and comparative law.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Articles and symposium proceedings will be published here upon formal release.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center pl-6 pr-2 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-legal-950 hover:from-gold-200 hover:to-gold-400 transition-all group"
              >
                <span>Subscribe for Updates</span>
                <span className="w-7 h-7 rounded-full bg-legal-950/15 flex items-center justify-center ml-3 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-legal-950" />
                </span>
              </Link>

              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-300 border border-white/10 hover:text-white hover:bg-white/5 transition-all"
              >
                <span>View Past Events Archive</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, Users, Shield, ArrowRight, Linkedin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'THE TEAM - Society of Indian Lawyers',
  description:
    'Meet the leadership, executive council, and advisory jurists steering the Society of Indian Lawyers (SIL).',
};

export default function TeamPage() {
  return (
    <div className="py-20 sm:py-32 bg-legal-950 min-h-[85vh] flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12 text-center">
        {/* Header matching original title: "THE TEAM" */}
        <div className="space-y-4">
          <span className="inline-block rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Collegiate Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            THE TEAM
          </h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Double-Bezel Coming Soon Card */}
        <div className="bezel-shell">
          <div className="bezel-core p-8 sm:p-14 space-y-8">
            <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mx-auto">
              <Users className="w-7 h-7" />
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
                Council Roster in Constitution
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Leadership Directory Coming Soon
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                The governing council, advisory jurists, and executive committee members of the Society of Indian Lawyers are currently in formal constitution under the Societies Registration Act, 1860.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                The complete directory of Senior Advocates, Patron Jurists, and Office Bearers will be published here shortly.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center pl-6 pr-2 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-legal-950 hover:from-gold-200 hover:to-gold-400 transition-all group"
              >
                <span>Inquire With Secretariat</span>
                <span className="w-7 h-7 rounded-full bg-legal-950/15 flex items-center justify-center ml-3 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-legal-950" />
                </span>
              </Link>

              <a
                href="https://www.linkedin.com/company/society-of-indian-lawyers-silf/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-300 border border-white/10 hover:text-white hover:bg-white/5 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 mr-2 text-[#0077b5]" />
                <span>Follow Updates on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

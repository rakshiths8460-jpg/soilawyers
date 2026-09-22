import React from 'react';
import { Metadata } from 'next';
import { Scale, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SIL_TEAM } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'THE TEAM - Society of Indian Lawyers',
  description:
    'Meet the leadership, executive council, and advisory jurists steering the Society of Indian Lawyers (SIL).',
};

export default function TeamPage() {
  return (
    <div className="py-20 sm:py-28 bg-legal-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Collegiate Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            THE TEAM
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            The governing council, advisory jurists, and dedicated practitioners dedicated to the mission and objectives of the Society of Indian Lawyers.
          </p>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Double-Bezel Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SIL_TEAM.map((member) => (
            <div key={member.id} className="bezel-shell">
              <div className="bezel-core p-8 sm:p-10 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                      <Scale className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-gold-300 bg-white/5 border border-gold-500/20">
                      {member.role}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider mt-1">
                      {member.designation}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{member.courtChamber}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-gold-300 font-semibold uppercase tracking-widest block mb-1">
                      Focus Domain:
                    </span>
                    <p className="text-xs text-slate-300">{member.specialization}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed pt-3 border-t border-white/5">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Society of Indian Lawyers</span>
                  <a
                    href="https://www.linkedin.com/company/society-of-indian-lawyers-silf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>Connect with Council</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Fellowship CTA */}
        <div className="bezel-shell max-w-4xl mx-auto">
          <div className="bezel-core p-8 sm:p-12 text-center space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Interested in Joining the SIL Fellowship?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              The Society welcomes practicing advocates, law academicians, retired judicial officers, and legal scholars passionate about judicial reform and mentorship.
            </p>
            <div className="pt-4">
              <Link
                href="/#contact"
                className="inline-flex items-center pl-6 pr-2 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-legal-950 hover:from-gold-200 hover:to-gold-400 transition-all group"
              >
                <span>Submit Membership Inquiry</span>
                <span className="w-7 h-7 rounded-full bg-legal-950/15 flex items-center justify-center ml-3 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-legal-950" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

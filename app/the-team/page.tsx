import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Users, Award, Shield, Scale, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { SIL_TEAM } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'THE TEAM - Society of Indian Lawyers',
  description:
    'Meet the leadership, executive council, and advisory jurists steering the Society of Indian Lawyers (SIL).',
};

export default function TeamPage() {
  return (
    <div className="py-12 sm:py-20 bg-legal-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header matching original title: "THE TEAM" */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Collegiate Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            THE TEAM
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The governing council, advisory jurists, and dedicated practitioners dedicated to the mission and objectives of the Society of Indian Lawyers.
          </p>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SIL_TEAM.map((member) => (
            <div
              key={member.id}
              className="glass-panel p-8 sm:p-10 rounded-2xl border border-legal-800 hover:border-gold-500/40 transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                    <Scale className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-gold-300 bg-legal-900 border border-gold-500/20">
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
                  <span className="text-[11px] text-gold-300 font-semibold uppercase tracking-wider block mb-1">
                    Focus Domain:
                  </span>
                  <p className="text-xs text-slate-300">{member.specialization}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-legal-800">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-legal-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Society of Indian Lawyers</span>
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
          ))}
        </div>

        {/* Join / Connect Callout */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 text-center max-w-4xl mx-auto space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Interested in Joining the SIL Fellowship?
          </h3>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            The Society welcomes practicing advocates, law academicians, retired judicial officers, and legal scholars passionate about judicial reform and mentorship.
          </p>
          <div className="pt-4">
            <Link
              href="/#contact"
              className="inline-flex items-center px-8 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-legal-950 hover:from-gold-300 hover:to-gold-400 shadow-xl shadow-gold-500/20 transition-all"
            >
              <span>Submit Membership Inquiry</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

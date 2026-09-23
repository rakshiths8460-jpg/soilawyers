import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, MapPin, Scale, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-institutional-950 hairline-t text-slate-300 pt-20 sm:pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Col 1: Institutional Authority */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-bronze-400/50 bg-institutional-900 p-0.5">
                <Image
                  src="/images/logo_sil.png"
                  alt="SIL Seal"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block">
                  Society of Indian Lawyers
                </span>
                <span className="text-[10px] text-bronze-400 uppercase tracking-[0.2em] font-sans font-medium">
                  DC-RIA-RS/2024/00041 · Founded 2024
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md font-sans">
              The Society of Indian Lawyers (SIL) is a non-political, not-for-profit learned society committed to advancing the rule of law, legal scholarship, and professional collaboration among members of the Indian and international legal fraternity.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center space-x-2 font-sans">
              <Shield className="w-3.5 h-3.5 text-bronze-400 flex-shrink-0" />
              <span>Registered under Societies Registration Act, 1860 · DC-RIA-RS/2024/00041</span>
            </div>
          </div>

          {/* Col 2: Institutional Governance */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-sans font-semibold text-slate-200 tracking-[0.2em] uppercase bronze-hairline-b pb-2">
              Charter
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-slate-400">
              <li>
                <Link href="/about-us" className="hover:text-bronze-300 transition-colors">
                  Constitutional Mandate
                </Link>
              </li>
              <li>
                <Link href="/about-us#objectives" className="hover:text-bronze-300 transition-colors">
                  5 Founding Objectives
                </Link>
              </li>
              <li>
                <Link href="/about-us#history" className="hover:text-bronze-300 transition-colors">
                  Statutory Heritage
                </Link>
              </li>
              <li>
                <Link href="/the-team" className="hover:text-bronze-300 transition-colors">
                  Executive Committee
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Proceedings & Conclaves */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-sans font-semibold text-slate-200 tracking-[0.2em] uppercase bronze-hairline-b pb-2">
              Proceedings
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-slate-400">
              <li>
                <Link href="/events" className="hover:text-bronze-300 transition-colors">
                  Photographic Archive
                </Link>
              </li>
              <li>
                <Link href="/events/ibc-turns-10" className="hover:text-bronze-300 transition-colors flex items-center">
                  <span>IBC Turns 10</span>
                  <span className="ml-1.5 px-1 py-0.2 text-[9px] uppercase tracking-wider bg-bronze-400/20 text-bronze-300 rounded border border-bronze-400/30">
                    2026
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-bronze-300 transition-colors">
                  Legal Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Secretariat */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-sans font-semibold text-slate-200 tracking-[0.2em] uppercase bronze-hairline-b pb-2">
              Secretariat Desk
            </h4>
            <div className="text-xs text-slate-400 space-y-3 font-sans">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-bronze-400 flex-shrink-0 mt-0.5" />
                <span>Headquarters: Chandigarh, India</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Scale className="w-4 h-4 text-bronze-400 flex-shrink-0 mt-0.5" />
                <span>Pan-India Bar & International Jurisdiction</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/society-of-indian-lawyers-silf/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded bg-institutional-900 border border-white/10 text-xs text-slate-200 hover:text-bronze-300 hover:border-bronze-400/40 transition-all group"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5] group-hover:scale-110 transition-transform" />
                <span>SIL on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-sans">
          <p>Copyright © 2026 Society of Indian Lawyers (SIL). All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0 text-[11px]">
            <span>HQ Chandigarh, India</span>
            <span>·</span>
            <Link href="/about-us" className="hover:text-slate-400 transition-colors">
              Statutory Declaration
            </Link>
            <span>·</span>
            <Link href="/admin" className="hover:text-slate-400 transition-colors">
              Internal Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

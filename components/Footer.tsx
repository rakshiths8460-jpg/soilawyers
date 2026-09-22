import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, MapPin, Scale, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-legal-950 border-t border-white/5 text-slate-300 pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Col 1: Identity */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gold-400/60 bg-legal-900">
                <Image
                  src="/images/logo_sil.png"
                  alt="SIL Seal"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white">SIL</span>
                <p className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-semibold">Society of Indian Lawyers</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A non-political, not-for-profit learned society committed to advancing the rule of law, legal education, and professional collaboration among members of the Indian and international legal fraternity.
            </p>
            <div className="pt-2 text-xs text-slate-500 flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
              <span>Registered under Societies Registration Act, 1860 • HQ Chandigarh</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-bold text-white tracking-[0.2em] uppercase border-b border-white/10 pb-2.5">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-gold-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold-300 transition-colors">Events & Conferences</Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-gold-300 transition-colors">Blogs & Scholarship</Link>
              </li>
              <li>
                <Link href="/the-team" className="hover:text-gold-300 transition-colors">The Team</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-gold-300 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Social & Secretarial */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-xs font-bold text-white tracking-[0.2em] uppercase border-b border-white/10 pb-2.5">
              Official Secretariat
            </h4>
            <div className="text-xs text-slate-400 space-y-2.5">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Headquarters: Chandigarh, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Founded 2024 • Societies Registration Act, 1860</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/society-of-indian-lawyers-silf/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-legal-900/90 border border-white/10 text-xs text-slate-200 hover:text-gold-300 hover:border-gold-500/40 transition-all group"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5] group-hover:scale-110 transition-transform" />
                <span>Follow SIL on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching original site text */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>Copyright © 2026 SIL - All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0 text-[11px]">
            <span>Headquartered in Chandigarh, India</span>
            <span>•</span>
            <Link href="/about-us" className="hover:text-slate-400 transition-colors">Constitutional Mandate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

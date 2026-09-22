import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, MapPin, Scale, Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-legal-950 border-t border-legal-800/80 text-slate-300 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Registration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
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
                <p className="text-[11px] text-gold-400 uppercase tracking-widest font-medium">Society of Indian Lawyers</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A non-political, not-for-profit learned society committed to advancing the rule of law, legal education, and professional collaboration among members of the Indian and international legal fraternity.
            </p>
            <div className="pt-1 text-xs text-slate-500 flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
              <span>Registered under Societies Registration Act, 1860</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase border-b border-legal-800 pb-2">
              Quick Navigation
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
                <Link href="/blogs" className="hover:text-gold-300 transition-colors">Blogs & Publications</Link>
              </li>
              <li>
                <Link href="/the-team" className="hover:text-gold-300 transition-colors">The Team</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-gold-300 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Objectives */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase border-b border-legal-800 pb-2">
              Our Mandate
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>Advancing knowledge of law & judicial administration</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>Promoting pro bono initiatives & access to justice</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>Comparative international legal research</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>Upholding professional and ethical Bar standards</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Headquarters & Social */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase border-b border-legal-800 pb-2">
              Headquarters
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Chandigarh, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Founded 2024</span>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-2">Connect Online</span>
              <a
                href="https://www.linkedin.com/company/society-of-indian-lawyers-silf/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-legal-900 border border-legal-800 text-xs text-slate-200 hover:text-gold-300 hover:border-gold-500/50 transition-all group"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5] group-hover:scale-110 transition-transform" />
                <span>Follow SIL on LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching original site text: "Copyright © 2026 SIL - All Rights Reserved." */}
        <div className="pt-8 mt-8 border-t border-legal-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>Copyright © 2026 SIL - All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <span className="text-slate-600">Headquartered in Chandigarh, India</span>
            <span>•</span>
            <Link href="/about-us" className="hover:text-slate-400 transition-colors">Privacy & Legal Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

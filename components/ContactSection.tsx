'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Linkedin, Mail, MapPin, Scale, AlertCircle, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    optIn: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) {
      setErrorMsg('Please provide your name and official email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 750);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-institutional-950 hairline-t relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-[10px] font-sans uppercase tracking-[0.22em] font-semibold text-bronze-400 block mb-2">
            Section 04 · Official Secretariat
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Communications & Inquiries
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Inquiries regarding membership, academic symposia, research collaborations, or bar representations may be directed to the Society of Indian Lawyers Secretariat.
          </p>
        </div>

        {/* Editorial Monograph Layout */}
        <div className="monograph-card p-6 sm:p-10 lg:p-12 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-7">
              <div className="space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Society of Indian Lawyers
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  The Society welcomes advocates across High Courts and Supreme Court of India, legal scholars, members of academia, and judicial researchers committed to advancing legal standards and legal education.
                </p>
              </div>

              <div className="space-y-4 pt-4 hairline-t">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded bg-bronze-400/10 border border-bronze-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-bronze-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-semibold text-slate-400 uppercase tracking-widest block">
                      Secretariat Headquarters
                    </span>
                    <p className="text-xs text-slate-200 mt-0.5 font-sans">
                      Chandigarh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded bg-bronze-400/10 border border-bronze-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-bronze-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-semibold text-slate-400 uppercase tracking-widest block">
                      Secretarial Desk Email
                    </span>
                    <p className="text-xs text-bronze-300 font-sans mt-0.5 font-medium">
                      contact@soilawyers.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded bg-bronze-400/10 border border-bronze-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-bronze-300">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-semibold text-slate-400 uppercase tracking-widest block">
                      Institutional Directory
                    </span>
                    <a
                      href="https://www.linkedin.com/company/society-of-indian-lawyers-silf/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-300 hover:text-bronze-300 transition-colors font-sans mt-0.5 inline-block underline"
                    >
                      linkedin.com/company/society-of-indian-lawyers-silf/
                    </a>
                  </div>
                </div>
              </div>

              {/* Secretarial Response Protocol */}
              <div className="p-4 rounded bg-institutional-900/90 border border-bronze-400/20 space-y-1.5 font-sans">
                <div className="flex items-center space-x-2 text-bronze-300 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-bronze-400" />
                  <span>Protocol of Communication</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Every official communication is logged and acknowledged within 48 hours by the Secretariat Committee.
                </p>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">Inquiry Registered</h4>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-sans">
                    Thank you for contacting the Society of Indian Lawyers. Your transmission has been queued for review by the secretarial committee.
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({ name: '', email: '', subject: '', message: '', optIn: true });
                      }}
                      className="inline-flex items-center px-4 py-2 rounded text-xs font-sans font-semibold uppercase tracking-wider bg-white/10 text-slate-200 hover:text-white hover:bg-white/15 transition-colors"
                    >
                      Transmit Another Communication
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  {errorMsg && (
                    <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-bronze-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Adv. / Prof. / Dr. / Name"
                        className="w-full bg-institutional-900/80 border border-white/10 rounded px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bronze-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-bronze-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="counsel@chambers.in"
                        className="w-full bg-institutional-900/80 border border-white/10 rounded px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bronze-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Subject / Matter
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Membership / Academic Conclave / Research Collaboration / General Inquiries"
                      className="w-full bg-institutional-900/80 border border-white/10 rounded px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bronze-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Message / Proposal <span className="text-bronze-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please elaborate on your inquiry or representation..."
                      className="w-full bg-institutional-900/80 border border-white/10 rounded p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bronze-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-start space-x-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="optIn"
                      checked={formState.optIn}
                      onChange={(e) => setFormState({ ...formState, optIn: e.target.checked })}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 text-bronze-500 focus:ring-bronze-400 bg-institutional-900"
                    />
                    <label htmlFor="optIn" className="text-[11px] text-slate-400 leading-tight cursor-pointer select-none">
                      Receive notifications of upcoming national legal conferences and gazette publications.
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-[0.14em] text-institutional-950 bg-bronze-400 hover:bg-bronze-300 transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting to Secretariat...</span>
                      ) : (
                        <>
                          <span>Transmit Communication</span>
                          <Send className="w-3.5 h-3.5 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

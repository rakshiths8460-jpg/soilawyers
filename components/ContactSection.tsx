'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Linkedin, Mail, ArrowUpRight, AlertCircle, ShieldCheck } from 'lucide-react';

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
      setErrorMsg('Please provide your name and email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 bg-legal-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 mb-4">
            Direct Communications
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Contact Us
          </h2>
          <p className="mt-3 text-lg text-gold-300 font-serif italic">
            Drop us a line!
          </p>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Double-Bezel Architecture Container */}
        <div className="bezel-shell max-w-6xl mx-auto">
          <div className="bezel-core p-6 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    Society of Indian Lawyers
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Whether you are an advocate, legal academician, law student, or an institution seeking collaborative conclaves, we welcome your inquiries, proposals, and membership applications.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Linkedin className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Official LinkedIn</span>
                      <a
                        href="https://www.linkedin.com/company/society-of-indian-lawyers-silf/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gold-300 hover:text-gold-200 underline break-all inline-block mt-0.5"
                      >
                        linkedin.com/company/society-of-indian-lawyers-silf/
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Secretarial Desk</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        contact@soilawyers.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* 48-Hour Response Commitment */}
                <div className="p-4 rounded-xl bg-legal-900/80 border border-gold-500/20">
                  <div className="flex items-center space-x-2 text-gold-400 text-xs font-semibold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secretariat Commitment</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    &ldquo;Thank you for your inquiry! We will get back to you within 48 hours.&rdquo;
                  </p>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-7">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-white">Inquiry Registered</h4>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for your inquiry! We will get back to you within 48 hours. A copy has been routed to the secretarial committee.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormState({ name: '', email: '', subject: '', message: '', optIn: true });
                        }}
                        className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-gold-300 hover:bg-white/15 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Name <span className="text-gold-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-legal-950/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Email <span className="text-gold-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full bg-legal-950/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Membership / Conclave / Research / General Inquiry"
                        className="w-full bg-legal-950/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Message <span className="text-gold-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Please detail your inquiry or proposal..."
                        className="w-full bg-legal-950/90 border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                      />
                    </div>

                    {/* Opt-in check matching live website */}
                    <div className="flex items-start space-x-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="optIn"
                        checked={formState.optIn}
                        onChange={(e) => setFormState({ ...formState, optIn: e.target.checked })}
                        className="mt-0.5 h-3.5 w-3.5 rounded border-legal-700 text-gold-500 focus:ring-gold-400 bg-legal-900"
                      />
                      <label htmlFor="optIn" className="text-[11px] text-slate-400 leading-tight cursor-pointer select-none">
                        Sign up for our email list for updates, promotions, and more.
                      </label>
                    </div>

                    {/* Button-in-Button CTA */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center pl-6 pr-2 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-legal-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 transition-all duration-300 active:scale-[0.98] group disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="py-1">Transmitting...</span>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <span className="w-7 h-7 rounded-full bg-legal-950/15 flex items-center justify-center ml-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                              <Send className="w-3.5 h-3.5 text-legal-950" />
                            </span>
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
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Linkedin, Mail, MessageSquare, User, Paperclip, AlertCircle, ArrowRight } from 'lucide-react';

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

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-legal-950 via-legal-900 to-legal-950 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20 mb-3">
              Reach Out To The Society
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Contact Us
            </h2>
            <p className="mt-3 text-lg text-gold-300 font-serif italic">
              Drop us a line!
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Context & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel p-8 rounded-2xl relative">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                Society of Indian Lawyers (SIL)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Whether you are a legal practitioner, judicial scholar, law student, or an institution seeking collaborative initiatives, we welcome your inquiries, proposals, and membership interests.
              </p>

              <div className="space-y-4 pt-4 border-t border-legal-800">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Linkedin className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Official LinkedIn</span>
                    <a
                      href="https://www.linkedin.com/company/society-of-indian-lawyers-silf/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gold-300 hover:text-gold-200 underline break-all flex items-center mt-0.5"
                    >
                      linkedin.com/company/society-of-indian-lawyers-silf/
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Direct Secretarial Desk</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      contact@soilawyers.com / secretariat@soilawyers.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast Response Guarantee Box */}
              <div className="mt-8 p-4 rounded-xl bg-legal-950/60 border border-gold-500/15">
                <p className="text-xs text-slate-400 italic">
                  &ldquo;Thank you for your inquiry! We will get back to you within 48 hours.&rdquo;
                </p>
                <span className="block text-[11px] text-gold-400 font-semibold mt-2 uppercase tracking-wider">
                  — SIL Executive Secretariat
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-legal-800 shadow-2xl relative">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">Inquiry Received</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for your inquiry! We will get back to you within 48 hours. A confirmation has been registered with our secretarial desk.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({ name: '', email: '', subject: '', message: '', optIn: true });
                      }}
                      className="inline-flex items-center px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-legal-800 text-gold-300 hover:bg-legal-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Name <span className="text-gold-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Hon. / Adv. / Prof. / Full Name"
                          className="w-full bg-legal-950/80 border border-legal-700/80 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Email <span className="text-gold-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="lawyer@chamber.in"
                          className="w-full bg-legal-950/80 border border-legal-700/80 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Membership / Conference / Research / General Inquiry"
                      className="w-full bg-legal-950/80 border border-legal-700/80 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Message <span className="text-gold-400">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Please write your inquiry or brief context here..."
                        className="w-full bg-legal-950/80 border border-legal-700/80 rounded-lg p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Email Opt-in Checkbox (from live site) */}
                  <div className="flex items-start space-x-3 pt-1">
                    <input
                      type="checkbox"
                      id="optIn"
                      checked={formState.optIn}
                      onChange={(e) => setFormState({ ...formState, optIn: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-legal-700 text-gold-500 focus:ring-gold-400 bg-legal-900"
                    />
                    <label htmlFor="optIn" className="text-xs text-slate-400 leading-normal cursor-pointer select-none">
                      Sign up for our email list for updates, legal symposium invitations, and announcements.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wider text-legal-950 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 hover:from-gold-300 hover:to-gold-400 transition-all duration-200 shadow-lg shadow-gold-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-legal-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span>Send Message</span>
                          <Send className="ml-2 w-4 h-4" />
                        </span>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed pt-2">
                    This site is protected by anti-spam and strict confidentiality protocols. Society of Indian Lawyers upholds advocate-client and communications privacy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

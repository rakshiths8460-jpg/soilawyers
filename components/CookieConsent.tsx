'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const val = localStorage.getItem('sil_cookies_accepted');
    if (!val) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sil_cookies_accepted', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 glass-panel p-5 rounded-xl border border-gold-500/30 shadow-2xl"
      >
        <div className="flex items-start space-x-3.5">
          <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 flex-shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h4 className="font-serif text-sm font-semibold text-white">This website uses cookies.</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-gold-400 text-legal-950 hover:bg-gold-300 transition-colors shadow"
              >
                Accept
              </button>
              <button
                onClick={() => setAccepted(true)}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

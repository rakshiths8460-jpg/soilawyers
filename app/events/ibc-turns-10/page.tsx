'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  Scale,
  CheckCircle2,
  Clock,
  Coffee,
  Award,
  ArrowRight,
  Shield,
  FileText,
  Mail,
  Phone,
  User,
  Building,
  Briefcase,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';

const AMENDMENTS = [
  {
    year: '2017',
    label: 'ORDINANCE / ACT',
    title: 'Keeping defaulters at the gate: Section 29A',
    description: 'Barred wilful defaulters and errant promoters from buying back their own companies at a discount, protecting the integrity of the resolution process.'
  },
  {
    year: '2018',
    label: 'SECOND AMENDMENT',
    title: 'Homebuyers at the table, and an exit door',
    description: 'Recognised homebuyers as financial creditors with a seat in the Committee of Creditors, eased voting thresholds, and introduced Section 12A to permit withdrawal on settlement.'
  },
  {
    year: '2019',
    label: 'AMENDMENT ACT',
    title: 'Discipline of the clock',
    description: 'Set a 330-day outer limit for resolution including litigation, and affirmed the primacy of the CoC\'s commercial wisdom in distribution.'
  },
  {
    year: '2020',
    label: 'PANDEMIC RESPONSE',
    title: 'Shielding honest business in a crisis',
    description: 'Suspended fresh insolvency filings for COVID-period defaults and raised the default threshold from ₹1 lakh to ₹1 crore, sparing MSMEs a wave of avoidable insolvencies.'
  },
  {
    year: '2021',
    label: 'PRE-PACK',
    title: 'A lighter path for MSMEs',
    description: 'Introduced the pre-packaged insolvency resolution process, a faster, hybrid, debtor-in-possession route designed for small enterprise.'
  },
  {
    year: '2026',
    label: 'AMENDMENT ACT NO. 6',
    title: 'The decadal overhaul',
    description: 'Fourteen-day admission timelines, a new creditor-initiated out-of-court resolution process, enabling frameworks for group insolvency and cross-border insolvency, and stronger CoC oversight of liquidation: the most sweeping reform since enactment.'
  }
];

const SESSIONS = [
  {
    tag: 'Ceremonial Opening',
    title: 'Inaugural Session: IBC Turns 10, the decade in retrospect',
    description: 'The ceremonial opening, with the keynote address and reflections from the Bench, the Bar and the regulator on ten years of the Code.'
  },
  {
    tag: 'Session I',
    title: 'The decade in judgment: how the courts built the Code',
    description: 'From Innoventive and Essar Steel to Swiss Ribbons and beyond: the jurisprudence that gave the statute its spine.'
  },
  {
    tag: 'Session II',
    title: 'The 2026 Amendment: creditor-initiated resolution, group & cross-border insolvency',
    description: 'A first close reading of the decadal overhaul, with the practitioners who will implement it.'
  },
  {
    tag: 'Session III',
    title: 'The unfinished agenda: delays, haircuts and institutional capacity',
    description: 'A candid session on what remains: adjudication timelines, valuation, and strengthening the tribunals.'
  }
];

export default function IbcEventPage() {
  const [eventSettings, setEventSettings] = useState<{
    price_inr: number;
    student_price_inr: number;
    is_registration_open: boolean;
    max_capacity: number;
  }>({
    price_inr: 2000,
    student_price_inr: 1000,
    is_registration_open: true,
    max_capacity: 200,
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    category: 'Advocate / NCLT Practitioner',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredAttendee, setRegisteredAttendee] = useState<any>(null);

  const isStudentCategory = (form.category || '').toLowerCase().includes('student');
  const professionalFee = eventSettings.price_inr !== undefined ? eventSettings.price_inr : 2000;
  const studentFee = eventSettings.student_price_inr !== undefined ? eventSettings.student_price_inr : 1000;
  const activeFee = isStudentCategory ? studentFee : professionalFee;

  // Fetch dynamic price and status
  useEffect(() => {
    fetch('/api/events/settings?slug=ibc-turns-10')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config) {
          setEventSettings(data.config);
        }
      })
      .catch((err) => console.error('Error fetching event config:', err));
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setErrorMsg('Please fill in your Name, Email, and Phone Number.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          event_slug: 'ibc-turns-10',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setRegisteredAttendee(data.attendee);
      } else {
        setErrorMsg(data.error || 'Registration could not be completed.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b1f17] text-[#f4f0e6] min-h-screen selection:bg-[#c5a880] selection:text-[#0b1f17]">
      {/* 1. HERO SECTION (Page 1 of Brochure) */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-b border-[#c5a880]/20 bg-gradient-to-b from-[#0a1c15] via-[#0d261d] to-[#0a1c15] overflow-hidden">
        {/* Decorative inner frame matching brochure page 1 */}
        <div className="max-w-4xl mx-auto p-6 sm:p-12 border border-[#c5a880]/30 rounded-2xl relative text-center space-y-6">
          <div className="text-[11px] sm:text-xs tracking-[0.3em] font-semibold uppercase text-[#dfcfb3]">
            CHANDIGARH · 24 OCTOBER 2026
          </div>

          <div className="text-xs sm:text-sm tracking-[0.25em] font-serif uppercase text-[#c5a880]">
            I B C &nbsp; T U R N S
          </div>

          {/* Giant 10 */}
          <div className="font-serif text-8xl sm:text-9xl font-bold tracking-tight text-[#fdfbf7] select-none">
            10
          </div>

          <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#dfcfb3] font-light">
            2 0 1 6 &nbsp; – &nbsp; 2 0 2 6
          </div>

          <div className="w-16 h-0.5 bg-[#c5a880] mx-auto my-4" />

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
            A decade of the <span className="italic text-[#dfcfb3]">Insolvency & Bankruptcy Code</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#d0c9b8] max-w-xl mx-auto font-light leading-relaxed">
            Marking 10 years of the law that rewrote India&apos;s credit culture.
          </p>

          {/* Registration Status & CTA */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c5a880] text-[#0a1c15] hover:bg-[#dfcfb3] transition-all shadow-xl font-sans"
            >
              <span>{`Register Now · ₹${professionalFee.toLocaleString('en-IN')} (Students ₹${studentFee.toLocaleString('en-IN')})`}</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>

            <a
              href="#agenda"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#dfcfb3] border border-[#c5a880]/40 hover:bg-[#c5a880]/10 transition-all font-sans"
            >
              <span>View Programme Agenda</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. SECTION I: The law that changed who blinks first (Page 2) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold block">
            A DECADE IN PERSPECTIVE · SECTION I
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#fdfbf7]">
            The law that changed <span className="italic text-[#dfcfb3]">who blinks first</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#d4cdbf] leading-relaxed">
          <p>
            When Parliament enacted the Insolvency and Bankruptcy Code in May 2016, India&apos;s insolvency regime was a maze of overlapping statutes (SICA, winding-up under the Companies Act, DRT proceedings, SARFAESI) in which a defaulting promoter could outlast his creditors for a decade. The Code replaced that maze with a single, time-bound, creditor-in-control process.
          </p>
          <p>
            Ten years on, the results are visible not merely in courtrooms but on bank balance sheets and in boardroom behaviour. The threat of losing the company, the shift from debtor in possession to creditor in control, has done what decades of recovery litigation could not: it made default expensive for the defaulter. As of March 2026, nearly 9,000 corporate insolvency cases have been admitted under the Code, of which over 7,100 have reached closure, and more than 4,000 companies have been rescued as going concerns through resolution plans, appellate settlements and withdrawals.
          </p>
        </div>

        {/* 4 Big Numbers from Page 2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-y border-[#c5a880]/25 py-8">
          <div className="p-4 rounded-xl bg-[#0e2a20] border border-[#c5a880]/20 text-center space-y-2">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#fdfbf7] block">₹4+ lakh cr</span>
            <p className="text-[11px] text-[#c0b8a7] leading-snug">Realised by creditors through resolution plans since 2016</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0e2a20] border border-[#c5a880]/20 text-center space-y-2">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#fdfbf7] block">167%</span>
            <p className="text-[11px] text-[#c0b8a7] leading-snug">Recovery as a share of liquidation value; rescue beats piecemeal sale</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0e2a20] border border-[#c5a880]/20 text-center space-y-2">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#fdfbf7] block">30,000+</span>
            <p className="text-[11px] text-[#c0b8a7] leading-snug">Cases settled before admission, involving nearly ₹14 lakh crore</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0e2a20] border border-[#c5a880]/20 text-center space-y-2">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#fdfbf7] block">8,987</span>
            <p className="text-[11px] text-[#c0b8a7] leading-snug">Cases admitted under the Code as of March 2026; 7,102 closed</p>
          </div>
        </div>

        {/* IBBI Quote */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#091a13] border-l-4 border-[#c5a880] text-xs sm:text-sm text-[#e8e1d5] italic space-y-2">
          <p>
            &ldquo;The Code has not merely reformed insolvency law; it has produced an institutional transformation with far-reaching consequences for credit markets, corporate behaviour and investor confidence.&rdquo;
          </p>
          <span className="not-italic text-[11px] text-[#c5a880] block font-semibold uppercase tracking-wider">
            — Insolvency and Bankruptcy Board of India, on the Code&apos;s tenth anniversary, May 2026
          </span>
        </div>
      </section>

      {/* 3. SECTION II: The turnaround in India's banking system (Page 3) */}
      <section className="py-20 bg-[#081711] border-y border-[#c5a880]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold block">
              THE ECONOMIC DIVIDEND · SECTION II
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fdfbf7]">
              The turnaround in India&apos;s banking system
            </h2>
            <p className="text-xs sm:text-sm text-[#cfc8b9]">
              The Code arrived at the depth of India&apos;s bad-loan crisis, when gross NPAs approached 12%. A decade later, that ratio has fallen to nearly 2%, a multi-decadal low.
            </p>
          </div>

          {/* Visual Chart from Page 3 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c231a] border border-[#c5a880]/30 max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-center block text-[#c5a880]">
              Gross NPA Ratio of Scheduled Commercial Banks (%)
            </span>
            <div className="grid grid-cols-5 gap-3 items-end h-44 pt-4 border-b border-[#c5a880]/30 pb-2">
              {[
                { year: 'FY18', val: 11.5, height: '100%' },
                { year: 'FY20', val: 8.2, height: '71%' },
                { year: 'FY22', val: 5.8, height: '50%' },
                { year: 'FY24', val: 2.8, height: '24%' },
                { year: 'FY26', val: 2.3, height: '20%' },
              ].map((bar) => (
                <div key={bar.year} className="flex flex-col items-center h-full justify-end space-y-2">
                  <span className="text-xs font-bold text-[#fdfbf7]">{bar.val}%</span>
                  <div
                    style={{ height: bar.height }}
                    className="w-full bg-gradient-to-t from-[#0e3526] to-[#c5a880] rounded-t-md transition-all duration-700"
                  />
                  <span className="text-[10px] text-[#c0b8a7] font-semibold">{bar.year}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#8e8778] text-center italic">
              Source: RBI, Report on Trend and Progress of Banking in India; IBBI decadal statement.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e271e] text-center max-w-3xl mx-auto border border-[#c5a880]/20">
            <p className="font-serif text-sm sm:text-base text-[#dfcfb3] italic">
              &ldquo;Cleaner bank balance sheets are not an accounting curiosity; they are the precondition for the credit growth that funds investment, employment and GDP.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECTION III: Seven amendments, one purpose (Page 4) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold block">
            A DECADE OF REFORM · SECTION III
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fdfbf7]">
            Seven amendments, one purpose: <span className="italic text-[#dfcfb3]">a stronger Code</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#cfc8b9]">
            Few Indian statutes have been tended as attentively as the Code. At each turn, when practice exposed a gap, Parliament responded.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENDMENTS.map((am) => (
            <div
              key={am.year}
              className="p-6 rounded-2xl bg-[#0d241c] border border-[#c5a880]/25 hover:border-[#c5a880] transition-colors space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-[#c5a880]">{am.year}</span>
                  <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#091a13] text-[#dfcfb3] border border-[#c5a880]/20">
                    {am.label}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-white leading-snug">{am.title}</h4>
                <p className="text-xs text-[#cfc8b9] leading-relaxed">{am.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECTION IV: A convening at Chandigarh (Page 5) */}
      <section id="agenda" className="py-20 bg-[#081711] border-y border-[#c5a880]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold block">
              THE CONFERENCE · SECTION IV
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fdfbf7]">
              A convening at <span className="italic text-[#dfcfb3]">Chandigarh</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#cfc8b9]">
              Bringing together the community that built this jurisprudence: judges, senior counsel, regulators, resolution professionals, bankers and scholars, for a full-day conference.
            </p>
          </div>

          {/* When / Where / Gathering Triad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto border border-[#c5a880]/30 rounded-2xl p-6 bg-[#0c241b] text-center">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">WHEN</span>
              <p className="font-serif text-lg font-bold text-white">24 October 2026</p>
            </div>
            <div className="space-y-1 border-t md:border-t-0 md:border-x border-[#c5a880]/20 pt-3 md:pt-0">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">WHERE</span>
              <p className="font-serif text-lg font-bold text-white">Chandigarh</p>
            </div>
            <div className="space-y-1 border-t md:border-t-0 border-[#c5a880]/20 pt-3 md:pt-0">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">GATHERING</span>
              <p className="font-serif text-lg font-bold text-white">200+ delegates</p>
            </div>
          </div>

          {/* Discussion Sessions */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {SESSIONS.map((ses, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0d271e] border border-[#c5a880]/20 hover:border-[#c5a880]/60 transition-all space-y-2"
              >
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
                  <span>{ses.tag}</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">{ses.title}</h3>
                <p className="text-xs text-[#cfc8b9] leading-relaxed">{ses.description}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#0e2a20] border border-[#c5a880]/20 text-center text-xs text-[#dfcfb3] max-w-2xl mx-auto">
            <span>High tea and lunch will be served • CPE accreditation sought from professional bodies.</span>
          </div>
        </div>
      </section>

      {/* 6. SECTION V & REGISTRATION FORM (Page 6 + User Requirement) */}
      <section id="register" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold block">
            DELEGATE ACCREDITATION · SECTION V
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            An invitation to <span className="italic text-[#dfcfb3]">lead the conversation</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#cfc8b9] leading-relaxed max-w-2xl mx-auto">
            This milestone belongs to those who shaped it. We would be honoured to have you join us as we take stock of ten years of the Insolvency and Bankruptcy Code.
          </p>
          <div className="w-16 h-0.5 bg-[#c5a880] mx-auto mt-4" />
        </div>

        {/* The Registration Form Card */}
        <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-[#c5a880]/40 via-[#c5a880]/20 to-transparent shadow-2xl">
          <div className="p-6 sm:p-12 rounded-[calc(2.5rem-0.25rem)] bg-[#0c241b] border border-[#c5a880]/30 space-y-8">
            {/* Form Header with Price */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#c5a880]/20 pb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Delegate Registration Form</h3>
                <p className="text-xs text-[#cfc8b9] mt-1">
                  Limited to 200 delegates • Special subsidized rate available for Students of Law
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-[#091a13] border border-[#c5a880]/40 text-center sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a880] block">Professional</span>
                  <span className="font-serif text-sm sm:text-base font-bold text-white">
                    {professionalFee > 0 ? `₹${professionalFee.toLocaleString('en-IN')}` : 'Complimentary'}
                  </span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-[#091a13] border border-emerald-500/40 text-center sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 block">Student</span>
                  <span className="font-serif text-sm sm:text-base font-bold text-emerald-300">
                    {studentFee > 0 ? `₹${studentFee.toLocaleString('en-IN')}` : 'Complimentary'}
                  </span>
                </div>
              </div>
            </div>

            {registeredAttendee ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#1b4332] border border-[#c5a880] flex items-center justify-center mx-auto text-[#dfcfb3]">
                  <CheckCircle2 className="w-8 h-8 text-[#c5a880]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">Registration Confirmed</span>
                  <h4 className="font-serif text-3xl font-bold text-white">{registeredAttendee.name}</h4>
                  <p className="text-xs text-[#cfc8b9]">A confirmation has been issued for your attendance at Chandigarh.</p>
                </div>

                {/* Ticket Receipt Box */}
                <div className="p-6 rounded-2xl bg-[#081711] border border-[#c5a880]/40 max-w-md mx-auto text-left space-y-3 font-sans">
                  <div className="flex justify-between text-xs border-b border-[#c5a880]/20 pb-2">
                    <span className="text-[#8e8778]">Ticket Reference ID:</span>
                    <span className="font-mono font-bold text-[#c5a880]">{registeredAttendee.ticket_id}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-[#c5a880]/20 pb-2">
                    <span className="text-[#8e8778]">Event:</span>
                    <span className="text-white">IBC Turns 10 (2016–2026)</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-[#c5a880]/20 pb-2">
                    <span className="text-[#8e8778]">Date & Venue:</span>
                    <span className="text-white">24 Oct 2026 · Chandigarh</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-[#c5a880]/20 pb-2">
                    <span className="text-[#8e8778]">Delegate Category:</span>
                    <span className="text-white">{registeredAttendee.category}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-[#c5a880]/20 pb-2">
                    <span className="text-[#8e8778]">Registration Fee:</span>
                    <span className="font-mono font-bold text-[#c5a880]">₹{(registeredAttendee.amount_paid || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8e8778]">Status:</span>
                    <span className="text-emerald-400 font-semibold uppercase">{registeredAttendee.payment_status}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setRegisteredAttendee(null);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        organization: '',
                        designation: '',
                        category: 'Advocate / NCLT Practitioner',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c5a880] text-[#0a1c15] hover:bg-[#dfcfb3]"
                  >
                    Register Another Delegate
                  </button>
                </div>
              </motion.div>
            ) : !eventSettings.is_registration_open ? (
              <div className="py-12 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                <h4 className="font-serif text-2xl font-bold text-white">Registrations Currently Closed</h4>
                <p className="text-xs text-[#cfc8b9] max-w-md mx-auto">
                  Delegate capacity has reached maximum or registrations have been paused by the Secretariat. Please contact the conveners for special allocations.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#dfcfb3] uppercase tracking-wider mb-2">
                      Full Name <span className="text-[#c5a880]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8e8778]" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Adv. / Dr. / Full Name"
                        className="w-full bg-[#081711] border border-[#c5a880]/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#686358] focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#dfcfb3] uppercase tracking-wider mb-2">
                      Email Address <span className="text-[#c5a880]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8e8778]" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="counsel@bar.in"
                        className="w-full bg-[#081711] border border-[#c5a880]/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#686358] focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#dfcfb3] uppercase tracking-wider mb-2">
                      Phone Number <span className="text-[#c5a880]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8e8778]" />
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#081711] border border-[#c5a880]/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#686358] focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Category */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#dfcfb3] uppercase tracking-wider mb-2">
                      Delegate Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-[#081711] border border-[#c5a880]/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                    >
                      <option value="Advocate / NCLT Practitioner">Advocate / NCLT Practitioner (₹{professionalFee.toLocaleString('en-IN')})</option>
                      <option value="Insolvency Professional (IP)">Insolvency Professional (IP) (₹{professionalFee.toLocaleString('en-IN')})</option>
                      <option value="Chartered Accountant / CS">Chartered Accountant / CS (₹{professionalFee.toLocaleString('en-IN')})</option>
                      <option value="Banker / Stressed Assets Team">Banker / Stressed Assets Team (₹{professionalFee.toLocaleString('en-IN')})</option>
                      <option value="Judicial / Academic Scholar">Judicial / Academic Scholar (₹{professionalFee.toLocaleString('en-IN')})</option>
                      <option value="Student of Law">Student of Law (Concession · ₹{studentFee.toLocaleString('en-IN')})</option>
                      <option value="Corporate Counsel / Officer">Corporate Counsel / Officer (₹{professionalFee.toLocaleString('en-IN')})</option>
                    </select>
                    <div className="mt-1.5 flex items-center text-[11px]">
                      {isStudentCategory ? (
                        <span className="text-emerald-300 font-medium">
                          🎓 Student concession applied: ₹{studentFee.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-[#c5a880] font-medium">
                          💼 Professional delegate rate: ₹{professionalFee.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#dfcfb3] uppercase tracking-wider mb-2">
                      Organization / Chambers
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8e8778]" />
                      <input
                        type="text"
                        value={form.organization}
                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        placeholder="High Court Chambers / Bank / NLU"
                        className="w-full bg-[#081711] border border-[#c5a880]/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#686358] focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#dfcfb3] uppercase tracking-wider mb-2">
                      Designation / Role
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8e8778]" />
                      <input
                        type="text"
                        value={form.designation}
                        onChange={(e) => setForm({ ...form, designation: e.target.value })}
                        placeholder="Partner / Senior Counsel / Associate"
                        className="w-full bg-[#081711] border border-[#c5a880]/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#686358] focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#c5a880]/20">
                  <span className="text-[11px] text-[#8e8778] leading-tight">
                    By submitting, your badge accreditation will be reserved for 24 October 2026 at Chandigarh.
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c5a880] text-[#0a1c15] hover:bg-[#dfcfb3] transition-all shadow-xl font-sans disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Reserving Accreditation...</span>
                    ) : (
                      <>
                        <span>{activeFee > 0 ? `Pay ₹${activeFee.toLocaleString('en-IN')} & Confirm (${isStudentCategory ? 'Student' : 'Professional'})` : 'Confirm Delegate Seat'}</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Conveners & Correspondence Box (Page 6 of Brochure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-2xl bg-[#081711] border border-[#c5a880]/30 text-center md:text-justify">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold block">CONVENERS</span>
            <p className="font-serif text-lg font-bold text-white">SUVIR SIDHU · KOMAL ABROL</p>
            <p className="text-xs text-[#8e8778]">Society of Indian Lawyers Organizing Committee</p>
          </div>
          <div className="space-y-1 md:text-right border-t md:border-t-0 border-[#c5a880]/20 pt-4 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold block">CORRESPONDENCE</span>
            <a href="mailto:ibcturns10@gmail.com" className="font-mono text-sm text-[#dfcfb3] hover:underline block">
              ibcturns10@gmail.com
            </a>
            <p className="text-xs text-[#8e8778]">Chandigarh · 24 October 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}

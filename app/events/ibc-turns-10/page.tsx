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
  ArrowUpRight,
  Shield,
  FileText,
  Mail,
  Phone,
  User,
  Building,
  Briefcase,
  AlertCircle,
  Download,
  Share2,
  Sparkles,
  TrendingDown,
  Layers,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Globe2,
  Landmark,
  Gavel
} from 'lucide-react';

// ============================================================================
// DATA STRUCTURES VERBATIM FROM 7-PAGE BROCHURE PDF
// ============================================================================

// 1. Core Decadal Impact Statistics (Page 3)
const DECADAL_STATS = [
  {
    figure: '₹4+ lakh cr',
    label: 'Realised by creditors through resolution plans since 2016',
    subtext: 'Direct recoveries under creditor-in-control process',
    badge: 'Creditor Realisation'
  },
  {
    figure: '167%',
    label: 'Recovery as a share of liquidation value; rescue beats piecemeal sale',
    subtext: 'Preserving going-concern enterprise value',
    badge: 'Enterprise Preservation'
  },
  {
    figure: '30,000+',
    label: 'Cases settled before admission, involving nearly ₹14 lakh crore',
    subtext: 'The deterrence dividend paid at the courthouse door',
    badge: 'Pre-Admission Deterrence'
  },
  {
    figure: '8,987',
    label: 'Cases admitted under the Code as of March 2026; 7,102 closed',
    subtext: 'More than 4,000 corporate debtors rescued',
    badge: 'Statutory Throughput'
  }
];

// 2. Gross NPA Data Points (Page 4)
const NPA_DATA = [
  { year: 'FY18', val: 11.5, heightPct: 100, note: 'Crisis Peak (11.5%)', delta: 'Baseline' },
  { year: 'FY20', val: 8.2, heightPct: 71.3, note: 'Early Reform Impact (8.2%)', delta: '-28.7%' },
  { year: 'FY22', val: 5.8, heightPct: 50.4, note: 'Pandemic Resilience (5.8%)', delta: '-49.6%' },
  { year: 'FY24', val: 2.8, heightPct: 24.3, note: 'Credit Rebound (2.8%)', delta: '-75.7%' },
  { year: 'FY26', val: 2.3, heightPct: 20.0, note: 'Multi-Decadal Low (2.3%)', delta: '-80.0%' }
];

// 3. Seven Amendments, One Purpose (Page 5)
const AMENDMENTS = [
  {
    year: '2017',
    badge: 'ORDINANCE / ACT',
    title: 'Keeping defaulters at the gate: Section 29A',
    description: 'Barred wilful defaulters and errant promoters from buying back their own companies at a discount, protecting the integrity of the resolution process.'
  },
  {
    year: '2018',
    badge: 'SECOND AMENDMENT',
    title: 'Homebuyers at the table, and an exit door',
    description: 'Recognised homebuyers as financial creditors with a seat in the Committee of Creditors, eased voting thresholds, and introduced Section 12A to permit withdrawal on settlement.'
  },
  {
    year: '2019',
    badge: 'AMENDMENT ACT',
    title: 'Discipline of the clock',
    description: 'Set a 330-day outer limit for resolution including litigation, and affirmed the primacy of the CoC\'s commercial wisdom in distribution.'
  },
  {
    year: '2020',
    badge: 'PANDEMIC RESPONSE',
    title: 'Shielding honest business in a crisis',
    description: 'Suspended fresh insolvency filings for COVID-period defaults and raised the default threshold from ₹1 lakh to ₹1 crore, sparing MSMEs a wave of avoidable insolvencies.'
  },
  {
    year: '2021',
    badge: 'PRE-PACK',
    title: 'A lighter path for MSMEs',
    description: 'Introduced the pre-packaged insolvency resolution process, a faster, hybrid, debtor-in-possession route designed for small enterprise.'
  },
  {
    year: '2026',
    badge: 'AMENDMENT ACT NO. 6',
    title: 'The decadal overhaul',
    description: 'Fourteen-day admission timelines, a new creditor-initiated out-of-court resolution process, enabling frameworks for group insolvency and cross-border insolvency, and stronger CoC oversight of liquidation: the most sweeping reform since enactment.'
  }
];

// 4. Verbatim Conference Schedule (Page 6)
const SCHEDULE = [
  {
    time: '9:30 – 10:00',
    phase: 'ARRIVAL',
    title: 'Registration, Welcome & Introduction of Guests',
    description: 'Delegate registration and seating, followed by the welcome and a formal introduction of the dignitaries and guests on the dais.',
    type: 'protocol'
  },
  {
    time: '10:00 – 11:30',
    phase: 'MORNING',
    title: 'Inaugural Session · IBC Turns 10, the Decade in Retrospect',
    description: 'The ceremonial opening of the conference: lighting of the lamp, the welcome address by the conveners, the inaugural address by the Chief Guest, reflections from the Bench, the Bar and the regulator on ten years of the Code, felicitation of dignitaries, and the vote of thanks.',
    type: 'plenary'
  },
  {
    time: '11:30 – 1:00',
    phase: 'SESSION 1',
    title: 'Cross-Border Insolvency: India’s Next Frontier',
    description: 'From Jet Airways’ parallel proceedings to the 2026 Amendment’s enabling framework: a panel on the UNCITRAL Model Law, recognition of foreign proceedings, and what practitioners should prepare for. Followed by questions from the floor.',
    type: 'panel'
  },
  {
    time: '1:00 – 2:00',
    phase: 'CONVIVIAL',
    title: 'LUNCH',
    description: 'Networking luncheon hosted for delegates, jurists, speakers, and institutional members.',
    type: 'break'
  },
  {
    time: '2:00 – 3:30',
    phase: 'SESSION 2',
    title: 'Mediation Meets Insolvency',
    description: 'Can you mediate an insolvency? A panel on the Mediation Act, 2023, the expert committee\'s recommendations, and the emerging out-of-court resolution landscape, with perspectives from the Bench, mediators and financial creditors. Followed by questions from the floor.',
    type: 'panel'
  },
  {
    time: '3:30 – 5:00',
    phase: 'SESSION 3',
    title: 'What the Next Decade Holds for Us',
    description: 'A candid panel on where the Code goes from here: tribunal capacity and timelines, the predictability of judicial outcomes, and the reforms the next decade requires. Followed by closing remarks and the vote of thanks.',
    type: 'panel'
  },
  {
    time: '5:00',
    phase: 'CONCLUDING',
    title: 'HIGH TEA',
    description: 'Concurrence reception and informal exchange among delegates and organizers.',
    type: 'break'
  }
];

// 5. Conveners Roster (Pages 6 & 7)
const CONVENERS = [
  'SUVIR SIDHU',
  'KOMAL ABROL',
  'PULKIT GOYAL',
  'NAHUSH JAIN',
  'GAURAV GOEL',
  'KARAN BHARDWAJ'
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
  const [activeChartYear, setActiveChartYear] = useState<string>('FY26');

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

  // Dynamic Razorpay checkout script loader
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as any).Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

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
      if (!data.success) {
        setErrorMsg(data.error || 'Registration could not be completed.');
        setLoading(false);
        return;
      }

      // If complimentary / free event
      if (!data.requiresPayment) {
        setRegisteredAttendee(data.attendee);
        setLoading(false);
        return;
      }

      // Paid event: Handle Mock Mode (when API keys are not configured in environment)
      if (data.isMock) {
        // Automatically verify in development mock mode
        const verifyRes = await fetch('/api/events/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ticket_id: data.ticket_id,
            isMock: true,
            razorpay_order_id: data.orderId,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setRegisteredAttendee(verifyData.attendee);
        } else {
          setErrorMsg(verifyData.error || 'Verification failed.');
        }
        setLoading(false);
        return;
      }

      // Live Razorpay Checkout
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setErrorMsg('Unable to reach Razorpay gateway. Please check your internet connection.');
        setLoading(false);
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'Society of Indian Lawyers',
        description: `IBC Turns 10: ${form.category}`,
        image: '/images/logo_sil.png',
        order_id: data.orderId,
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: form.phone.trim(),
        },
        notes: {
          ticket_id: data.ticket_id,
          category: form.category,
        },
        theme: {
          color: '#c5a880',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setErrorMsg('Payment cancelled. Your seat reservation is pending payment confirmation.');
          },
        },
        handler: async function (response: any) {
          try {
            setLoading(true);
            const verifyRes = await fetch('/api/events/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ticket_id: data.ticket_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setRegisteredAttendee(verifyData.attendee);
            } else {
              setErrorMsg(verifyData.error || 'Payment signature verification failed. Please contact Secretariat.');
            }
          } catch (err: any) {
            setErrorMsg('Verification request error. If your payment was deducted, our webhook will confirm your seat.');
          } finally {
            setLoading(false);
          }
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.on('payment.failed', function (failResp: any) {
        setErrorMsg(`Payment failed: ${failResp.error?.description || 'Transaction declined.'}`);
        setLoading(false);
      });
      rzpInstance.open();
    } catch (err: any) {
      setErrorMsg('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#071710] text-[#f4f0e6] min-h-screen selection:bg-[#c5a880] selection:text-[#071710]">
      {/* =========================================================================
          PAGE 1: COVER & HERO DISPLAY
          ========================================================================= */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8 border-b border-[#c5a880]/20 bg-gradient-to-b from-[#06140d] via-[#091f16] to-[#071710] overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative text-center space-y-8">
          {/* Double-Bezel Outer Shell for Hero Card */}
          <div className="p-1 sm:p-2 rounded-[2.5rem] bg-gradient-to-b from-[#c5a880]/40 via-[#c5a880]/15 to-[#c5a880]/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="p-8 sm:p-14 rounded-[calc(2.5rem-0.375rem)] bg-[#0a1e16] border border-[#c5a880]/30 space-y-7 relative">
              
              {/* Location & Date Eyebrow */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#071710] border border-[#c5a880]/30 text-[11px] font-sans uppercase tracking-[0.28em] text-[#dfcfb3]">
                <MapPin className="w-3 h-3 text-[#c5a880]" />
                <span>CHANDIGARH · 24 OCTOBER 2026</span>
              </div>

              {/* Conference Title Masthead */}
              <div className="space-y-1 pt-2">
                <span className="text-xs sm:text-sm tracking-[0.35em] font-serif uppercase text-[#c5a880] font-medium block">
                  I B C &nbsp; T U R N S
                </span>
                
                {/* Giant 10 Emblem */}
                <div className="relative inline-block py-2">
                  <span className="font-serif text-8xl sm:text-[11rem] font-bold tracking-tight text-[#fdfbf7] leading-none select-none block drop-shadow-2xl">
                    10
                  </span>
                  {/* Subtle Decadal Golden Pip */}
                  <div className="absolute top-4 right-1/4 translate-x-3 w-4 h-4 rounded-full bg-gradient-to-br from-[#dfcfb3] to-[#c5a880] shadow-md border border-[#0a1e16]" />
                </div>

                <div className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#dfcfb3] font-light">
                  2 0 1 6 &nbsp; – &nbsp; 2 0 2 6
                </div>
              </div>

              {/* Hairline Divider with Diamond */}
              <div className="flex items-center justify-center space-x-3 max-w-xs mx-auto py-1">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#c5a880]/50" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#c5a880]" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#c5a880]/50" />
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide leading-tight">
                A DECADE OF RESOLUTION
              </h1>

              <p className="text-xs sm:text-sm text-[#d0c9b8] max-w-xl mx-auto font-light leading-relaxed text-justify sm:text-center">
                Marking ten years of the Insolvency and Bankruptcy Code: the statutory architecture that transformed debtor-creditor relations, corporate governance, and India&apos;s banking balance sheets.
              </p>

              {/* IN ASSOCIATION WITH (SIL + INSOL India) */}
              <div className="pt-4 border-t border-[#c5a880]/20 space-y-4">
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#8e8778] font-semibold block">
                  IN ASSOCIATION WITH
                </span>
                
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                  {/* SIL Association Pill */}
                  <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-[#071710] border border-[#c5a880]/30">
                    <div className="w-8 h-8 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center font-serif text-xs font-bold text-[#c5a880]">
                      SIL
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-serif font-bold text-white block">Society of Indian Lawyers</span>
                      <span className="text-[9px] uppercase tracking-wider text-[#8e8778]">Headquarters Chandigarh</span>
                    </div>
                  </div>

                  {/* INSOL India Association Pill */}
                  <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-[#071710] border border-[#c5a880]/30">
                    <div className="w-8 h-8 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center font-sans text-[11px] font-bold text-red-300">
                      INSOL
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-serif font-bold text-white block">INSOL India</span>
                      <span className="text-[9px] uppercase tracking-wider text-[#8e8778]">Member, INSOL International</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Action CTA Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#register"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfcfb3] via-[#c5a880] to-[#b3956e] text-[#071710] hover:brightness-110 transition-all shadow-xl font-sans group active:scale-[0.98]"
                >
                  <span>{`Register as Delegate · ₹${professionalFee.toLocaleString('en-IN')}`}</span>
                  <div className="ml-3 w-6 h-6 rounded-full bg-[#071710]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-[#071710]" />
                  </div>
                </a>

                <a
                  href="#schedule"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#dfcfb3] border border-[#c5a880]/40 hover:bg-[#c5a880]/10 transition-all font-sans"
                >
                  <Calendar className="mr-2 w-4 h-4 text-[#c5a880]" />
                  <span>View Conference Schedule</span>
                </a>
              </div>

              <div className="text-[11px] text-[#8e8778] pt-1">
                Student of Law concession rate: ₹{studentFee.toLocaleString('en-IN')} • Limited to 200 seats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 2: SECTION I — OUR PARTNERS (SIL & INSOL INDIA)
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#c5a880] font-semibold block">
            IN COLLABORATION · SECTION I
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#fdfbf7]">
            Our <span className="italic text-[#dfcfb3]">partners</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a880]/60 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Society of Indian Lawyers (SIL) */}
          <div className="p-1 rounded-[2rem] bg-gradient-to-b from-[#c5a880]/30 to-transparent">
            <div className="p-8 sm:p-10 rounded-[calc(2rem-0.25rem)] bg-[#0b2118] border border-[#c5a880]/25 space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-4 text-justify">
                <div className="flex items-center justify-between border-b border-[#c5a880]/20 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-white">The Society of Indian Lawyers (SIL)</h3>
                  <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded bg-[#071710] text-[#c5a880] border border-[#c5a880]/30 font-sans">
                    Founded 2024
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#d4cdbf] leading-relaxed">
                  The Society of Indian Lawyers is a non-political, not-for-profit learned society committed to advancing the rule of law, legal education, and professional collaboration across the Indian and international legal fraternity. Founded in 2024 by senior members of the Indian Bar and academic leaders, and registered under the Societies Registration Act, 1860, with its headquarters at Chandigarh, SIL bridges the gap between practitioners, scholars and students: a forum for professional growth, policy dialogue, and public service through law.
                </p>

                <p className="text-xs sm:text-sm text-[#d4cdbf] leading-relaxed">
                  Its mission is to promote legal excellence, uphold justice, and foster dialogue across jurisdictions through research, education and professional exchange, including seminars and conferences, pro bono initiatives, comparative legal research, and the maintenance of high professional and ethical standards among its members.
                </p>
              </div>

              <div className="pt-4 border-t border-[#c5a880]/15 flex items-center justify-between text-[11px] text-[#c5a880]">
                <span>Headquarters: Chandigarh</span>
                <span className="font-mono">DC-RIA-RS/2024/00041</span>
              </div>
            </div>
          </div>

          {/* Card 2: INSOL India */}
          <div className="p-1 rounded-[2rem] bg-gradient-to-b from-[#c5a880]/30 to-transparent">
            <div className="p-8 sm:p-10 rounded-[calc(2rem-0.25rem)] bg-[#0b2118] border border-[#c5a880]/25 space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-4 text-justify">
                <div className="flex items-center justify-between border-b border-[#c5a880]/20 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-white">INSOL India</h3>
                  <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded bg-[#071710] text-red-300 border border-red-500/30 font-sans">
                    INSOL International
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#d4cdbf] leading-relaxed">
                  INSOL India is the country&apos;s leading professional association for insolvency and restructuring, bringing together the full breadth of the discipline: insolvency professionals, advocates, chartered accountants, bankers, academics and judges. It is the Indian member association of INSOL International, the worldwide federation of national insolvency associations whose membership spans thousands of professionals across dozens of jurisdictions, giving Indian practice a permanent seat in the global restructuring conversation.
                </p>

                <p className="text-xs sm:text-sm text-[#d4cdbf] leading-relaxed">
                  Over the very decade this conference celebrates, INSOL India has been the intellectual home of the restructuring community. Its annual conclaves, convened with the participation of the regulator and the adjudicating institutions, have become the profession&apos;s principal meeting ground; its programmes, publications and younger-members&apos; initiatives have deepened scholarship in the field and built the next generation of practitioners; and its international linkages have carried Indian jurisprudence, from Essar Steel to the cross-border frontier, into the global discourse. A decadal reckoning of the Code would be incomplete without the community INSOL India represents.
                </p>
              </div>

              <div className="pt-4 border-t border-[#c5a880]/15 flex items-center justify-between text-[11px] text-[#c5a880]">
                <span>Insolvency & Restructuring Community</span>
                <span>Global Jurisprudence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 3: SECTION II — THE LAW THAT CHANGED WHO BLINKS FIRST
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-y border-[#c5a880]/20 bg-[#06150e]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#c5a880] font-semibold block">
              A DECADE IN PERSPECTIVE · SECTION II
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#fdfbf7]">
              The law that changed <span className="italic text-[#dfcfb3]">who blinks first</span>
            </h2>
            <div className="w-12 h-0.5 bg-[#c5a880]/60 mx-auto mt-2" />
          </div>

          {/* Narrative Paragraphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#d4cdbf] leading-relaxed text-justify">
            <p>
              When Parliament enacted the Insolvency and Bankruptcy Code in May 2016, India&apos;s insolvency regime was a maze of overlapping statutes (SICA, winding-up under the Companies Act, DRT proceedings, SARFAESI) in which a defaulting promoter could outlast his creditors for a decade. The Code replaced that maze with a single, time-bound, creditor-in-control process.
            </p>
            <p>
              Ten years on, the results are visible not merely in courtrooms but on bank balance sheets and in boardroom behaviour. The threat of losing the company, the shift from debtor in possession to creditor in control, has done what decades of recovery litigation could not: it made default expensive for the defaulter. As of March 2026, nearly 9,000 corporate insolvency cases have been admitted under the Code, of which over 7,100 have reached closure, and more than 4,000 companies have been rescued as going concerns through resolution plans, appellate settlements and withdrawals.
            </p>
          </div>

          {/* 4 Big Numbers (Exact from Page 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DECADAL_STATS.map((stat, idx) => (
              <motion.div
                key={stat.figure}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-1 rounded-2xl bg-gradient-to-b from-[#c5a880]/30 to-transparent"
              >
                <div className="p-6 rounded-[calc(1rem+0.25rem)] bg-[#0b2118] border border-[#c5a880]/25 space-y-3 h-full flex flex-col justify-between text-justify">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#c5a880] font-sans font-semibold">
                      {stat.badge}
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#fdfbf7] block">
                      {stat.figure}
                    </span>
                  </div>
                  <p className="text-xs text-[#cfc8b9] leading-snug font-medium">
                    {stat.label}
                  </p>
                  <span className="text-[10px] text-[#8e8778] block pt-2 border-t border-[#c5a880]/15">
                    {stat.subtext}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Deterrence Effect Callout Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#091f16] border border-[#c5a880]/30 text-xs sm:text-sm text-[#e8e1d5] space-y-3 text-justify">
            <h4 className="font-serif text-base font-bold text-[#dfcfb3] uppercase tracking-wider">
              The Invisible Deterrence Dividend
            </h4>
            <p className="leading-relaxed">
              The most powerful number may be the one that never reached a courtroom. Over thirty thousand cases were withdrawn or settled at the pre-admission stage, with debtors paying up at the courthouse door rather than face the resolution process. This deterrence effect, invisible in recovery tables, is the Code&apos;s deepest contribution to credit discipline.
            </p>
          </div>

          {/* Official IBBI 10th Anniversary Quote (May 2026) */}
          <div className="p-8 rounded-2xl bg-[#071911] border-l-4 border-[#c5a880] text-sm sm:text-base text-[#e8e1d5] italic space-y-3 text-justify">
            <p className="leading-relaxed">
              &ldquo;The Code has not merely reformed insolvency law; it has produced an institutional transformation with far-reaching consequences for credit markets, corporate behaviour and investor confidence.&rdquo;
            </p>
            <span className="not-italic text-xs text-[#c5a880] block font-semibold uppercase tracking-wider font-sans">
              — Insolvency and Bankruptcy Board of India, on the Code&apos;s tenth anniversary, May 2026
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 4: SECTION III — THE TURNAROUND IN INDIA'S BANKING SYSTEM
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#c5a880] font-semibold block">
            THE ECONOMIC DIVIDEND · SECTION III
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#fdfbf7]">
            The turnaround in India&apos;s <span className="italic text-[#dfcfb3]">banking system</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a880]/60 mx-auto mt-2" />
          <p className="text-xs sm:text-sm text-[#cfc8b9] pt-2 text-justify sm:text-center">
            The Code arrived at the depth of India&apos;s bad-loan crisis, when gross NPAs of scheduled commercial banks approached twelve per cent. A decade later, that ratio has fallen to nearly two per cent, a multi-decadal low.
          </p>
        </div>

        {/* Interactive Animated Bar Chart (Exact Data from Page 4) */}
        <div className="max-w-3xl mx-auto p-1 sm:p-2 rounded-3xl bg-gradient-to-b from-[#c5a880]/40 via-[#c5a880]/15 to-transparent shadow-2xl">
          <div className="p-6 sm:p-10 rounded-[calc(1.5rem-0.125rem)] bg-[#0a1e16] border border-[#c5a880]/30 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#c5a880]/20 pb-4">
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                  GROSS NPA RATIO OF SCHEDULED COMMERCIAL BANKS (%)
                </h4>
                <p className="text-[11px] text-[#8e8778]">
                  Evolution from peak bad-loan crisis to multi-decadal recovery
                </p>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#071710] border border-emerald-500/30 text-[10px] text-emerald-300 font-sans font-semibold">
                <TrendingDown className="w-3 h-3 text-emerald-400" />
                <span>-80.0% Reduction (FY18 → FY26)</span>
              </div>
            </div>

            {/* Bars Area with Framer Motion Animation */}
            <div className="h-64 sm:h-72 flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-3 px-2 sm:px-6 border-b border-[#c5a880]/25 relative">
              {/* Background Reference Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-[#c5a880] w-full" />
                <div className="border-b border-[#c5a880] w-full" />
                <div className="border-b border-[#c5a880] w-full" />
                <div className="border-b border-[#c5a880] w-full" />
              </div>

              {NPA_DATA.map((bar) => {
                const isSelected = activeChartYear === bar.year;
                return (
                  <div
                    key={bar.year}
                    onClick={() => setActiveChartYear(bar.year)}
                    onMouseEnter={() => setActiveChartYear(bar.year)}
                    className="flex-1 flex flex-col items-center h-full justify-end relative cursor-pointer group"
                  >
                    {/* Floating Value Tooltip on hover/active */}
                    <div
                      className={`text-xs font-mono font-bold transition-all mb-2 ${
                        isSelected ? 'text-[#c5a880] scale-110' : 'text-[#d4cdbf] group-hover:text-white'
                      }`}
                    >
                      {bar.val}%
                    </div>

                    {/* Animated Bar Column */}
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${bar.heightPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-t from-[#c5a880]/60 via-[#c5a880] to-[#dfcfb3] shadow-[0_0_20px_rgba(197,168,128,0.4)]'
                          : 'bg-gradient-to-t from-[#0e3526] to-[#40735d] group-hover:to-[#c5a880]'
                      }`}
                    />

                    {/* Year Label */}
                    <span
                      className={`text-xs font-semibold tracking-wider pt-3 transition-colors ${
                        isSelected ? 'text-[#c5a880]' : 'text-[#8e8778] group-hover:text-[#dfcfb3]'
                      }`}
                    >
                      {bar.year}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Bar Detail Card */}
            {activeChartYear && (
              <div className="p-3.5 rounded-xl bg-[#071710] border border-[#c5a880]/30 flex flex-col sm:flex-row items-center justify-between text-xs text-[#d0c9b8] gap-2">
                <span className="font-semibold text-white">
                  {NPA_DATA.find((b) => b.year === activeChartYear)?.year}:{' '}
                  <span className="text-[#c5a880]">{NPA_DATA.find((b) => b.year === activeChartYear)?.note}</span>
                </span>
                <span className="text-[11px] text-[#8e8778]">
                  Reduction vs FY18: <strong className="text-emerald-300">{NPA_DATA.find((b) => b.year === activeChartYear)?.delta}</strong>
                </span>
              </div>
            )}

            <p className="text-[11px] text-[#8e8778] text-center italic">
              Source: RBI, Report on Trend and Progress of Banking in India; IBBI decadal statement (GNPA 2.1% as of September 2025, against 11.8% in 2017).
            </p>
          </div>
        </div>

        {/* Narrative & Economic Dividend Details (Page 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#d4cdbf] leading-relaxed text-justify">
          <p>
            The dividend has flowed straight to the economy. Public sector banks, once the epicentre of the crisis, reported a combined net profit of ₹1.98 lakh crore in FY25. Capital that sat frozen in dead companies has been recycled into fresh credit, and the RBI&apos;s own reporting identifies the IBC as the single most effective recovery channel, accounting for over half of all bank recoveries in FY25.
          </p>
          <p>
            Beyond recovery, the Code preserved enterprise value: steel plants, power assets and real-estate projects that would once have rusted through years of litigation changed hands as going concerns, protecting jobs and downstream industry. Creditors realised roughly 167 per cent of liquidation value through resolution: proof that rescuing a firm is worth more than dismantling it.
          </p>
        </div>

        {/* Highlight Quote (Page 4) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0b2118] text-center max-w-3xl mx-auto border border-[#c5a880]/30">
          <p className="font-serif text-sm sm:text-lg text-[#dfcfb3] italic leading-relaxed">
            &ldquo;Cleaner bank balance sheets are not an accounting curiosity; they are the precondition for the credit growth that funds investment, employment and GDP.&rdquo;
          </p>
        </div>
      </section>

      {/* =========================================================================
          PAGE 5: SECTION IV — SEVEN AMENDMENTS, ONE PURPOSE: A STRONGER CODE
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-y border-[#c5a880]/20 bg-[#06150e]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#c5a880] font-semibold block">
              A DECADE OF REFORM · SECTION IV
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#fdfbf7]">
              Seven amendments, one purpose: <span className="italic text-[#dfcfb3]">a stronger Code</span>
            </h2>
            <div className="w-12 h-0.5 bg-[#c5a880]/60 mx-auto mt-2" />
            <p className="text-xs sm:text-sm text-[#cfc8b9] pt-2 text-justify sm:text-center">
              Few Indian statutes have been tended as attentively as the Code. At each turn, when practice exposed a gap, Parliament responded, making the IBC a rare example of iterative, evidence-led lawmaking.
            </p>
          </div>

          {/* 6 Chronological Amendment Cards (Exact from Page 5) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AMENDMENTS.map((am, idx) => (
              <motion.div
                key={am.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-1 rounded-2xl bg-gradient-to-b from-[#c5a880]/25 to-transparent hover:from-[#c5a880]/50 transition-all"
              >
                <div className="p-7 rounded-[calc(1rem+0.25rem)] bg-[#0b2118] border border-[#c5a880]/25 space-y-4 h-full flex flex-col justify-between text-justify">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#c5a880]/15 pb-3">
                      <span className="font-serif text-3xl font-bold text-[#c5a880]">{am.year}</span>
                      <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded bg-[#071710] text-[#dfcfb3] border border-[#c5a880]/30 font-sans">
                        {am.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white leading-snug">
                      {am.title}
                    </h4>

                    <p className="text-xs text-[#cfc8b9] leading-relaxed">
                      {am.description}
                    </p>
                  </div>

                  <div className="pt-2 text-[10px] text-[#8e8778] font-mono">
                    Milestone {idx + 1} of 6
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 6: CONFERENCE SCHEDULE (CHANDIGARH · 24 OCTOBER 2026)
          ========================================================================= */}
      <section id="schedule" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0a1e16] border border-[#c5a880]/30 text-[11px] font-sans uppercase tracking-[0.25em] text-[#dfcfb3]">
            <Clock className="w-3 h-3 text-[#c5a880]" />
            <span>IBC TURNS 10 · CHANDIGARH · 24 OCTOBER 2026</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#fdfbf7]">
            Conference <span className="italic text-[#dfcfb3]">Schedule</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a880]/60 mx-auto mt-2" />
          <p className="text-xs text-[#8e8778] uppercase tracking-widest">
            All timings are in Indian Standard Time (IST)
          </p>
        </div>

        {/* Timetable Flow (Exact from Page 6) */}
        <div className="space-y-4">
          {SCHEDULE.map((item, idx) => {
            const isBreak = item.type === 'break';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`p-1 rounded-2xl transition-all ${
                  isBreak
                    ? 'bg-gradient-to-r from-[#c5a880]/20 to-transparent'
                    : 'bg-gradient-to-b from-[#c5a880]/30 to-transparent'
                }`}
              >
                <div
                  className={`p-6 sm:p-8 rounded-[calc(1rem+0.25rem)] border text-justify ${
                    isBreak
                      ? 'bg-[#081b12] border-[#c5a880]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4'
                      : 'bg-[#0a2017] border-[#c5a880]/25 space-y-3'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-[#c5a880]/15 pb-2">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#c5a880] whitespace-nowrap">
                      {item.time}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#8e8778]">
                      {item.phase}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base sm:text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#cfc8b9] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Conveners Banner (Exact from Page 6 & 7) */}
        <div className="p-8 rounded-2xl bg-[#0a1e16] border border-[#c5a880]/30 space-y-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#c5a880] font-semibold block">
            CONVENERS
          </span>
          <p className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
            {CONVENERS.join(' · ')}
          </p>
          <div className="pt-2 text-xs">
            <a
              href="mailto:ibcturns10@gmail.com"
              className="font-mono text-[#dfcfb3] hover:text-[#c5a880] underline transition-colors"
            >
              ibcturns10@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 7: SECTION V — AN INVITATION TO LEAD THE CONVERSATION
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-y border-[#c5a880]/20 bg-[#06150e]">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#c5a880] font-semibold block">
              SECTION V
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#fdfbf7]">
              An invitation to <span className="italic text-[#dfcfb3]">lead the conversation</span>
            </h2>
            <div className="w-12 h-0.5 bg-[#c5a880]/60 mx-auto mt-2" />
          </div>

          {/* Invitation Prose (Verbatim from Page 7) */}
          <div className="space-y-6 text-sm sm:text-base text-[#d4cdbf] leading-relaxed text-justify max-w-3xl mx-auto">
            <p>
              This milestone belongs to those who shaped it. We would be honoured to have you join us, on the dais, in the keynote, or in conversation, as we take stock of ten years of the Insolvency and Bankruptcy Code.
            </p>
            <p>
              Your participation would lend the gathering the weight of experience: the view from the Bench that decided these questions, the counsel&apos;s craft that argued them, and the regulator&apos;s vantage over the system as a whole. We seek not ceremony but candour: an honest reckoning of what the Code has achieved and what the next decade demands of it.
            </p>
          </div>

          {/* Decadal Motto (Page 7) */}
          <div className="py-8 border-y border-[#c5a880]/20 space-y-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-widest text-[#dfcfb3] block">
              2016 — 2026
            </span>
            <p className="font-serif text-base sm:text-xl text-[#fdfbf7] italic">
              A decade of resolution. A decade of reform.
            </p>
            <p className="text-xs sm:text-sm text-[#c5a880] uppercase tracking-widest font-sans font-medium">
              The next decade begins with this conversation.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          REGISTRATION PORTAL & PAYMENT FLOW (SEAMLESSLY ANCHORING AT BOTTOM)
          ========================================================================= */}
      <section id="register" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0a1e16] border border-[#c5a880]/30 text-[11px] font-sans uppercase tracking-[0.25em] text-[#dfcfb3]">
            <Gavel className="w-3 h-3 text-[#c5a880]" />
            <span>OFFICIAL REGISTRATION PORTAL</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Delegate Accreditation
          </h2>
          <p className="text-xs sm:text-sm text-[#cfc8b9] max-w-xl mx-auto">
            Reserve your accredited seat for the decadal conference at Chandigarh. Immediate digital receipt and verification issued upon payment.
          </p>
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
                  {registeredAttendee.razorpay_payment_id && (
                    <div className="flex justify-between text-xs border-b border-[#c5a880]/20 pb-2">
                      <span className="text-[#8e8778]">Payment Ref ID:</span>
                      <span className="font-mono text-emerald-400 truncate max-w-[200px]">{registeredAttendee.razorpay_payment_id}</span>
                    </div>
                  )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-2xl bg-[#081711] border border-[#c5a880]/30 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold block">CONVENERS</span>
            <p className="font-serif text-base sm:text-lg font-bold text-white leading-relaxed">
              SUVIR SIDHU &bull; KOMAL ABROL &bull; PULKIT GOYAL &bull; NAHUSH JAIN &bull; GAURAV GOEL &bull; KARAN BHARDWAJ
            </p>
            <p className="text-xs text-[#8e8778]">Society of Indian Lawyers Organizing Committee</p>
          </div>
          <div className="space-y-1 md:text-right border-t md:border-t-0 border-[#c5a880]/20 pt-4 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold block">CORRESPONDENCE</span>
            <a href="mailto:ibcturns10@gmail.com" className="font-mono text-sm text-[#dfcfb3] hover:underline block">
              ibcturns10@gmail.com
            </a>
            <p className="text-xs text-[#8e8778]">Chandigarh &bull; 24 October 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}

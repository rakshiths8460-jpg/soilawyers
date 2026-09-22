'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  DollarSign,
  Calendar,
  Lock,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowUpRight,
  RefreshCw,
  Tag
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard state
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [attendees, setAttendees] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalRegistrations: 0,
    totalRevenue: 0,
    seatsRemaining: 200,
    maxCapacity: 200,
    priceInr: 0,
    isOpen: true,
    isNeon: false,
  });

  // Price modification state
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editIsOpen, setEditIsOpen] = useState<boolean>(true);
  const [editCapacity, setEditCapacity] = useState<number>(200);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Check saved session
  useEffect(() => {
    const saved = localStorage.getItem('sil_admin_auth');
    if (saved === 'active') {
      setIsAuthenticated(true);
      fetchDashboard();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('sil_admin_auth', 'active');
        setIsAuthenticated(true);
        fetchDashboard();
      } else {
        setAuthError(data.error || 'Incorrect passcode');
      }
    } catch (err) {
      setAuthError('Authentication request failed');
    }
  };

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/attendees?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.success) {
        setAttendees(data.attendees);
        setStats(data.stats);
        setEditPrice(data.stats.priceInr);
        setEditIsOpen(data.stats.isOpen);
        setEditCapacity(data.stats.maxCapacity);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_inr: editPrice,
          is_registration_open: editIsOpen,
          max_capacity: editCapacity,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        fetchDashboard();
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-legal-950">
        <div className="bezel-shell max-w-md w-full">
          <div className="bezel-core p-8 space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white">SIL Admin Portal</h1>
              <p className="text-xs text-slate-400 mt-1">Manage event pricing, registrations & attendees</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {authError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter secret passcode..."
                  className="w-full bg-legal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Default passcode: sil2026</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-300 to-gold-500 text-legal-950 hover:from-gold-200 hover:to-gold-400 transition-all font-sans"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-legal-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="font-serif text-3xl font-bold text-white">Event Administration</h1>
              <span
                className={`px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider flex items-center space-x-1.5 ${
                  stats.isNeon
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                }`}
              >
                <Database className="w-3 h-3" />
                <span>{stats.isNeon ? 'Connected to Neon DB' : 'Local Fallback Active'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              IBC Turns 10 (24 October 2026, Chandigarh) • Real-time attendee roster & price controller
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/events/ibc-turns-10"
              target="_blank"
              className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-gold-300 bg-white/5 border border-white/10 hover:bg-white/10"
            >
              <span>View Public Page</span>
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem('sil_admin_auth');
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Analytics Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bezel-shell">
            <div className="bezel-core p-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Total Attendees</span>
              <p className="font-serif text-3xl font-bold text-white">{stats.totalRegistrations}</p>
              <span className="text-[11px] text-slate-500">Confirmed delegate seats</span>
            </div>
          </div>

          <div className="bezel-shell">
            <div className="bezel-core p-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Current Ticket Price</span>
              <p className="font-serif text-3xl font-bold text-gold-300">
                {stats.priceInr > 0 ? `₹${stats.priceInr.toLocaleString('en-IN')}` : 'Free'}
              </p>
              <span className="text-[11px] text-slate-500">Configured event price</span>
            </div>
          </div>

          <div className="bezel-shell">
            <div className="bezel-core p-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Seats Remaining</span>
              <p className="font-serif text-3xl font-bold text-white">{stats.seatsRemaining}</p>
              <span className="text-[11px] text-slate-500">Out of {stats.maxCapacity} capacity</span>
            </div>
          </div>

          <div className="bezel-shell">
            <div className="bezel-core p-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Registration Status</span>
              <p className={`font-serif text-3xl font-bold ${stats.isOpen ? 'text-emerald-400' : 'text-red-400'}`}>
                {stats.isOpen ? 'OPEN' : 'CLOSED'}
              </p>
              <span className="text-[11px] text-slate-500">Accepting delegate registrations</span>
            </div>
          </div>
        </div>

        {/* Event Pricing & Settings Controller */}
        <div className="bezel-shell">
          <div className="bezel-core p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Event Pricing & Capacity Controller</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Change the price or toggle registrations. Changes reflect immediately on the public event page.
                </p>
              </div>
              {saveSuccess && (
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Settings Updated Successfully</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-end">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Ticket Fee (in ₹ INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    min={0}
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-full bg-legal-900 border border-white/10 rounded-xl pl-8 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Set 0 for Complimentary/Free</span>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Max Capacity
                </label>
                <input
                  type="number"
                  min={1}
                  value={editCapacity}
                  onChange={(e) => setEditCapacity(Number(e.target.value))}
                  className="w-full bg-legal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Registration Status
                </label>
                <select
                  value={editIsOpen ? 'open' : 'closed'}
                  onChange={(e) => setEditIsOpen(e.target.value === 'open')}
                  className="w-full bg-legal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                >
                  <option value="open">Open (Accepting Registrations)</option>
                  <option value="closed">Closed (Paused / Sold Out)</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gold-400 text-legal-950 hover:bg-gold-300 transition-all font-sans disabled:opacity-50"
                >
                  {saveLoading ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Attendee Roster Section */}
        <div className="bezel-shell">
          <div className="bezel-core p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Registered Delegates ({attendees.length})</h3>
                <p className="text-xs text-slate-400 mt-0.5">Attendee details captured during registration</p>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchDashboard()}
                    placeholder="Search name, email, phone..."
                    className="w-full bg-legal-900 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <button
                  onClick={fetchDashboard}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Refresh Roster"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>

                {/* Export CSV Button */}
                <a
                  href="/api/admin/export"
                  download
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  <span>Export CSV</span>
                </a>
              </div>
            </div>

            {/* Attendees Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-3 px-3">Ticket ID</th>
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Phone</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Organization</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Registered On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {attendees.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        No registrations recorded yet. Attendees who sign up via the event page will appear here.
                      </td>
                    </tr>
                  ) : (
                    attendees.map((att) => (
                      <tr key={att.ticket_id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3 font-mono text-gold-300 font-bold">{att.ticket_id}</td>
                        <td className="py-3 px-3 font-medium text-white">{att.name}</td>
                        <td className="py-3 px-3">{att.email}</td>
                        <td className="py-3 px-3 font-mono">{att.phone}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                            {att.category || 'General'}
                          </span>
                        </td>
                        <td className="py-3 px-3 truncate max-w-[150px]">{att.organization || '—'}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold ${
                              att.payment_status === 'paid'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {att.payment_status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">
                          {new Date(att.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

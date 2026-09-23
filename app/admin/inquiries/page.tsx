'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowUpRight,
  RefreshCw,
  Lock,
  Mail,
  Phone,
  Clock,
  Trash2,
  Eye,
  X,
  FileText,
  Calendar,
  Users
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard state
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [counts, setCounts] = useState({
    total: 0,
    unread: 0,
    read: 0,
    resolved: 0,
    optIns: 0,
  });
  const [isNeon, setIsNeon] = useState(false);

  // Selected Inquiry for Modal view
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  // Check saved session
  useEffect(() => {
    const saved = localStorage.getItem('sil_admin_auth');
    if (saved === 'active') {
      setIsAuthenticated(true);
      fetchInquiries();
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
      if (res.ok && data.success) {
        localStorage.setItem('sil_admin_auth', 'active');
        setIsAuthenticated(true);
        fetchInquiries();
      } else {
        setAuthError(data.error || 'Invalid administrator passcode.');
      }
    } catch (err: any) {
      setAuthError('Connection error while authenticating.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sil_admin_auth');
    setIsAuthenticated(false);
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
        if (data.counts) setCounts(data.counts);
        setIsNeon(data.isNeon || false);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        fetchInquiries();
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [search, statusFilter, isAuthenticated]);

  const handleStatusChange = async (inquiry_id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiry_id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.inquiry_id === inquiry_id ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiry && selectedInquiry.inquiry_id === inquiry_id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
        fetchInquiries();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (inquiry_id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?inquiry_id=${inquiry_id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.inquiry_id !== inquiry_id));
        if (selectedInquiry && selectedInquiry.inquiry_id === inquiry_id) {
          setSelectedInquiry(null);
        }
        fetchInquiries();
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-institutional-950 flex items-center justify-center p-4">
        <div className="editorial-grain" />
        <div className="monograph-card p-8 rounded-lg max-w-md w-full relative z-10 border border-white/10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded bg-bronze-400/10 border border-bronze-400/20 flex items-center justify-center mx-auto text-bronze-300">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">SIL Secretariat Registry</h1>
            <p className="text-xs text-slate-400 font-sans">
              Enter administrator passcode to access submitted questions & inquiries.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-sans">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: sil2026)"
                className="w-full bg-institutional-900 border border-white/10 rounded px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bronze-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded text-xs font-semibold uppercase tracking-wider bg-bronze-400 text-institutional-950 hover:bg-bronze-300 transition-colors"
            >
              Access Registry
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-500 font-sans">
            Society of Indian Lawyers · DC-RIA-RS/2024/00041
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-institutional-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-100 relative">
      <div className="editorial-grain" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Top Header & Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 hairline-b gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                SIL Secretariat Portal
              </span>
              <div
                className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[10px] font-sans font-semibold uppercase tracking-wider border ${
                  isNeon
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}
              >
                <Database className="w-3 h-3" />
                <span>{isNeon ? 'Neon PostgreSQL Live' : 'Local Persistent Store'}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Central Registry of user questions, membership communications, and conference inquiries.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-sans">
            <button
              onClick={fetchInquiries}
              className="p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Refresh Inquiries"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <a
              href="/api/admin/inquiries/export"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Export CSV</span>
            </a>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-red-950/40 text-red-300 border border-red-500/30 hover:bg-red-950/60 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* SECTION NAVIGATION TABS */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <Link
            href="/admin"
            className="px-4 py-2 rounded text-xs font-sans font-semibold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Event Registrations & Pricing</span>
          </Link>

          <Link
            href="/admin/inquiries"
            className="px-4 py-2 rounded text-xs font-sans font-semibold uppercase tracking-wider bg-bronze-400 text-institutional-950 font-bold transition-colors flex items-center space-x-2 shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Inquiries & Questions</span>
            {counts.unread > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-bold">
                {counts.unread}
              </span>
            )}
          </Link>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="monograph-card p-5 rounded-lg space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-slate-400 block">
              Total Inquiries
            </span>
            <div className="font-serif text-3xl font-bold text-white">{counts.total}</div>
            <p className="text-[11px] text-slate-500 font-sans">All recorded messages</p>
          </div>

          <div className="monograph-card p-5 rounded-lg space-y-1 border-amber-500/20">
            <span className="text-[10px] font-sans uppercase tracking-widest text-amber-400 block">
              Unread / New
            </span>
            <div className="font-serif text-3xl font-bold text-amber-300">{counts.unread}</div>
            <p className="text-[11px] text-slate-500 font-sans">Awaiting secretariat review</p>
          </div>

          <div className="monograph-card p-5 rounded-lg space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-slate-400 block">
              Read / In Progress
            </span>
            <div className="font-serif text-3xl font-bold text-slate-200">{counts.read}</div>
            <p className="text-[11px] text-slate-500 font-sans">Under review by committee</p>
          </div>

          <div className="monograph-card p-5 rounded-lg space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-emerald-400 block">
              Resolved / Closed
            </span>
            <div className="font-serif text-3xl font-bold text-emerald-300">{counts.resolved}</div>
            <p className="text-[11px] text-slate-500 font-sans">Official response sent</p>
          </div>
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-sans">
          <div className="flex items-center space-x-2">
            {['all', 'unread', 'read', 'resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider font-semibold transition-colors ${
                  statusFilter === st
                    ? 'bg-bronze-400 text-institutional-950'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, query..."
              className="w-full bg-institutional-900 border border-white/10 rounded pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-bronze-400"
            />
          </div>
        </div>

        {/* INQUIRIES LIST / TABLE */}
        <div className="monograph-card rounded-lg overflow-hidden border border-white/10">
          <div className="p-4 sm:p-5 hairline-b flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-white">
              Questions & Inquiries Roster ({inquiries.length})
            </h2>
            <span className="text-[11px] text-slate-400 font-sans">
              Click any question to view full text and manage response status
            </span>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-sans text-xs">
              No questions or inquiries found matching your filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-institutional-900/90 text-slate-400 uppercase tracking-wider text-[10px] hairline-b">
                  <tr>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Submitted At</th>
                    <th className="py-3 px-4">Sender Name</th>
                    <th className="py-3 px-4">Contact Details</th>
                    <th className="py-3 px-4">Subject & Message</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {inquiries.map((inq) => (
                    <tr
                      key={inq.inquiry_id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                            inq.status === 'unread'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : inq.status === 'read'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-bronze-300">
                        {inq.inquiry_id}
                      </td>

                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {new Date(inq.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className="py-3 px-4 font-semibold text-white">
                        {inq.name}
                      </td>

                      <td className="py-3 px-4 text-slate-300 space-y-0.5">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-bronze-400" />
                          <span>{inq.email}</span>
                        </div>
                        {inq.phone && (
                          <div className="flex items-center space-x-1 text-slate-400">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>{inq.phone}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-semibold text-slate-200 truncate">
                          {inq.subject || 'General Inquiry'}
                        </div>
                        <div className="text-slate-400 text-[11px] truncate">
                          {inq.message}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                            title="View Full Question"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(inq.inquiry_id)}
                            className="p-1.5 rounded bg-red-950/40 hover:bg-red-950/80 text-red-400"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* DETAIL MODAL FOR SELECTED INQUIRY */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="monograph-card p-6 sm:p-8 rounded-lg max-w-2xl w-full border border-white/15 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 hairline-b">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-bronze-400 font-semibold block">
                  Registry Record · {selectedInquiry.inquiry_id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {selectedInquiry.subject || 'General Inquiry'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded bg-institutional-900/80 border border-white/5 text-xs font-sans">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Sender Name</span>
                <span className="font-semibold text-white text-sm">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Date Transmitted</span>
                <span className="text-slate-200">
                  {new Date(selectedInquiry.created_at).toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Email Address</span>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject || 'Society of Indian Lawyers Inquiry')}`}
                  className="text-bronze-300 hover:underline flex items-center space-x-1 mt-0.5"
                >
                  <Mail className="w-3 h-3" />
                  <span>{selectedInquiry.email}</span>
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Phone Number</span>
                <span className="text-slate-200">
                  {selectedInquiry.phone ? selectedInquiry.phone : 'Not provided'}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-slate-300 block">
                Question / Message Content:
              </span>
              <div className="p-5 rounded bg-institutional-950 border border-white/10 text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Quick-Actions */}
            <div className="pt-4 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Change Status:</span>
                {(['unread', 'read', 'resolved'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.inquiry_id, st)}
                    className={`px-3 py-1 rounded uppercase tracking-wider font-semibold text-[10px] transition-colors ${
                      selectedInquiry.status === st
                        ? 'bg-bronze-400 text-institutional-950 font-bold'
                        : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject || 'Society of Indian Lawyers Inquiry')}`}
                  className="inline-flex items-center px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-bronze-400 text-institutional-950 hover:bg-bronze-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

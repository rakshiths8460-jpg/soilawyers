'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ChevronRight, X } from 'lucide-react';
import { SIL_BLOGS, BlogPost } from '@/data/siteData';

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredBlogs = SIL_BLOGS.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-20 sm:py-28 bg-legal-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Scholarly Publications & Analysis
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            BLOGS | SIL
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Authoritative commentaries on Indian constitutional law, commercial arbitration, judicial ethics, and access to justice reforms.
          </p>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Minimal Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal articles, topics, or jurisprudence..."
            className="w-full bg-legal-900 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
          />
        </div>

        {/* Document-Style Bento Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((post) => (
            <div key={post.id} className="bezel-shell group">
              <article className="bezel-core p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 font-semibold text-[10px] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2
                    onClick={() => setSelectedPost(post)}
                    className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold-300 transition-colors cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">{post.author}</span>
                    <span className="text-[10px] text-slate-400 block">{post.authorTitle}</span>
                  </div>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <div className="bezel-shell max-w-3xl w-full max-h-[85vh]">
                <div className="bezel-core p-6 sm:p-10 overflow-y-auto max-h-[80vh] space-y-6 relative">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="space-y-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-400">
                      {selectedPost.category} • {selectedPost.readTime}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {selectedPost.title}
                    </h2>
                    <div className="flex items-center space-x-2 text-xs text-slate-400 pt-1">
                      <span>By {selectedPost.author}</span>
                      <span>•</span>
                      <span>{selectedPost.date}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-white/10 pt-6">
                    {selectedPost.content.map((p, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Society of Indian Lawyers (SIL)</span>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-400 text-legal-950 hover:bg-gold-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

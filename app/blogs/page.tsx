'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Calendar, User, Clock, ChevronRight, X, Bookmark, Share2 } from 'lucide-react';
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
    <div className="py-12 sm:py-20 bg-legal-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching title: "BLOGS | SIL" */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20">
            Scholarly Publications & Analysis
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            BLOGS | SIL
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Authoritative commentaries on Indian constitutional law, commercial arbitration, judicial ethics, and access to justice reforms.
          </p>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal articles, topics, or jurisprudence..."
            className="w-full bg-legal-900 border border-legal-700/80 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-legal-800 hover:border-gold-500/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-md bg-gold-500/10 border border-gold-500/20 text-gold-400 font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2
                  onClick={() => setSelectedPost(post)}
                  className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition-colors cursor-pointer leading-snug"
                >
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-legal-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">{post.author}</span>
                  <span className="text-[11px] text-slate-400 block">{post.authorTitle}</span>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <span>Read Article</span>
                  <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Article Reader Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-legal-950 border border-gold-500/30 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl space-y-6 relative"
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-legal-900 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
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

                <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed border-t border-legal-800 pt-6 font-sans">
                  {selectedPost.content.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-6 border-t border-legal-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Society of Indian Lawyers (SIL)</span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gold-400 text-legal-950 hover:bg-gold-300"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

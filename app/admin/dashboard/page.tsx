'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, research: 0, blog: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [p, r, b] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('research').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        projects: p.count || 0,
        research: r.count || 0,
        blog: b.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const actions = [
    { name: 'Add Project', href: '/admin/projects/new', color: 'accent-1' },
    { name: 'Add Research', href: '/admin/research/new', color: 'accent-1' },
    { name: 'Add Blog Post', href: '/admin/blog/new', color: 'accent-2' },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome back, Piyush</h1>
        <p className="text-white/40 italic">What are we building today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Projects', count: stats.projects, icon: '🚀' },
          { label: 'Research', count: stats.research, icon: '🔬' },
          { label: 'Blog Posts', count: stats.blog, icon: '✍️' },
        ].map((stat) => (
          <div key={stat.label} className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center">
            <span className="text-3xl mb-4">{stat.icon}</span>
            <span className="text-4xl font-bold mb-1">{stat.count}</span>
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className={`px-8 py-4 bg-white/5 border border-white/10 hover:border-${action.color} rounded-2xl transition-all duration-300 font-medium hover:bg-${action.color}/10`}
          >
            <span className="mr-2">+</span> {action.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

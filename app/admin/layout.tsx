'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [counts, setCounts] = useState({ projects: 0, research: 0, blog: 0 });

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (currentUser && pathname === '/admin/login') {
        router.push('/admin/dashboard');
      }
      setUser(currentUser);
      setLoading(false);
    };

    const fetchCounts = async () => {
      const [p, r, b] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('research').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      ]);
      setCounts({
        projects: p.count || 0,
        research: r.count || 0,
        blog: b.count || 0,
      });
    };

    checkUser();
    if (pathname !== '/admin/login') fetchCounts();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-1 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Projects', href: '/admin/projects', icon: '🚀', count: counts.projects },
    { name: 'Research', href: '/admin/research', icon: '🔬', count: counts.research },
    { name: 'Blog', href: '/admin/blog', icon: '✍️', count: counts.blog },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col fixed h-full bg-[#0a0a0a] z-40">
        <div className="mb-12">
          <Link href="/" className="text-xl font-bold tracking-tighter">YouKnowWhat</Link>
          <p className="text-[10px] text-accent-1 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === item.href 
                  ? 'bg-accent-1 text-black font-bold' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                {item.name}
              </div>
              {item.count !== undefined && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${pathname === item.href ? 'bg-black/20' : 'bg-white/10'}`}>
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <button 
          onClick={async () => {
            await signOut();
            router.push('/');
          }}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-12">
        {children}
      </main>
    </div>
  );
}

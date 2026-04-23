'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0a0a0a]">
      <div className="glass w-full max-w-md p-8 rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
          <p className="text-white/40 text-sm italic">Authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors text-white"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-xs text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent-1 text-black font-bold rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-white/30 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

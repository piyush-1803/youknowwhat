'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminResearchPage() {
  const [research, setResearch] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResearch = async () => {
    try {
      const res = await fetch('/api/research');
      const data = await res.json();
      setResearch(data);
    } catch (error) {
      console.error('Error fetching research:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this research entry?')) return;

    try {
      const res = await fetch(`/api/research/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setResearch(research.filter(r => r.id !== id));
      alert('Research deleted successfully');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const statusColors: any = {
    'idea': 'bg-white/10 text-white/40',
    'in-progress': 'bg-accent-1/10 text-accent-1',
    'published': 'bg-accent-2/10 text-accent-2',
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Research</h1>
          <p className="text-white/40">Manage your papers and ideas</p>
        </div>
        <Link 
          href="/admin/research/add"
          className="px-6 py-3 bg-accent-1 text-black font-bold rounded-xl hover:bg-white transition-all duration-300"
        >
          + Add Research
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl" />)}
        </div>
      ) : research.length > 0 ? (
        <div className="overflow-hidden glass rounded-2xl border border-white/5">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-mono uppercase tracking-widest text-white/40">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 hidden md:table-cell">PDF Link</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {research.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-xs text-white/30 truncate max-w-xs">
                    {item.pdf_link || '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link 
                        href={`/admin/research/${item.id}`}
                        className="p-2 hover:text-accent-1 transition-colors"
                      >
                        ✏️
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:text-red-500 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass p-12 rounded-3xl border border-white/5 text-center">
          <p className="text-xl text-white/40 italic mb-6">No research yet.</p>
          <Link href="/admin/research/add" className="text-accent-1 hover:underline">
            Click '+ Add Research' to get started!
          </Link>
        </div>
      )}
    </div>
  );
}

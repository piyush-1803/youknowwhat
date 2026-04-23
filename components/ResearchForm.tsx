'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ResearchFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const ResearchForm = ({ initialData, isEditing = false }: ResearchFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'idea',
    pdf_link: initialData?.pdf_link || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const url = isEditing ? `/api/research/${initialData.id}` : '/api/research';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save research');

      setMessage({ type: 'success', text: `Research ${isEditing ? 'updated' : 'added'} successfully!` });
      
      setTimeout(() => {
        router.push('/admin/research');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/5 space-y-6">
      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Title *</label>
        <input 
          type="text" 
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Description</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Status</label>
        <select 
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors appearance-none"
        >
          <option value="idea">💡 Idea</option>
          <option value="in-progress">🚧 In Progress</option>
          <option value="published">📜 Published</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">PDF Link (URL)</label>
        <input 
          type="url" 
          value={formData.pdf_link}
          onChange={(e) => setFormData({ ...formData, pdf_link: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
        />
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button 
          type="submit"
          disabled={loading}
          className="flex-grow py-4 bg-accent-1 text-black font-bold rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Research' : 'Add Research'}
        </button>
        <button 
          type="button"
          onClick={() => router.push('/admin/research')}
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ResearchForm;

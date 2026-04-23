'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const ProjectForm = ({ initialData, isEditing = false }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    github_link: initialData?.github_link || '',
    demo_link: initialData?.demo_link || '',
    tags: initialData?.tags?.join(', ') || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    };

    try {
      const url = isEditing ? `/api/projects/${initialData.id}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save project');

      setMessage({ type: 'success', text: `Project ${isEditing ? 'updated' : 'added'} successfully!` });
      
      setTimeout(() => {
        router.push('/admin/projects');
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">GitHub Link</label>
          <input 
            type="url" 
            value={formData.github_link}
            onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Demo Link</label>
          <input 
            type="url" 
            value={formData.demo_link}
            onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Tags (comma separated)</label>
        <input 
          type="text" 
          placeholder="Next.js, TypeScript, AI"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
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
          {loading ? 'Saving...' : isEditing ? 'Update Project' : 'Add Project'}
        </button>
        <button 
          type="button"
          onClick={() => router.push('/admin/projects')}
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;

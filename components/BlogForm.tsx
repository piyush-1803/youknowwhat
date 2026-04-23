'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const BlogForm = ({ initialData, isEditing = false }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    published: initialData?.published ?? false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const update: any = { title };
    if (!isEditing) {
      update.slug = generateSlug(title);
    }
    setFormData({ ...formData, ...update });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const url = isEditing ? `/api/blog/${initialData.id}` : '/api/blog';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save blog post');

      setMessage({ type: 'success', text: `Post ${isEditing ? 'updated' : 'added'} successfully!` });
      
      setTimeout(() => {
        router.push('/admin/blog');
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Title *</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Slug *</label>
          <input 
            type="text" 
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Excerpt</label>
        <textarea 
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Content (Markdown)</label>
        <textarea 
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors font-mono text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="w-5 h-5 accent-accent-2 bg-white/5 border border-white/10 rounded"
        />
        <label htmlFor="published" className="text-sm font-medium text-white/70 cursor-pointer">
          Publish this post immediately
        </label>
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
          className="flex-grow py-4 bg-accent-2 text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Add Post'}
        </button>
        <button 
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;

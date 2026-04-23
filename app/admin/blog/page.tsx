'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setPosts(posts.filter(p => p.id !== id));
      alert('Post deleted successfully');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Blog Posts</h1>
          <p className="text-white/40">Share your thoughts with the world</p>
        </div>
        <Link 
          href="/admin/blog/add"
          className="px-6 py-3 bg-accent-2 text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300"
        >
          + Add Blog Post
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl" />)}
        </div>
      ) : posts.length > 0 ? (
        <div className="overflow-hidden glass rounded-2xl border border-white/5">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-mono uppercase tracking-widest text-white/40">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4 hidden md:table-cell">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium">{post.title}</td>
                  <td className="px-6 py-4 hidden md:table-cell text-sm text-white/30 font-mono">{post.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${post.published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link 
                        href={`/admin/blog/${post.id}`}
                        className="p-2 hover:text-accent-2 transition-colors"
                      >
                        ✏️
                      </Link>
                      <button 
                        onClick={() => handleDelete(post.id)}
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
          <p className="text-xl text-white/40 italic mb-6">No blog posts yet.</p>
          <Link href="/admin/blog/add" className="text-accent-2 hover:underline">
            Click '+ Add Blog Post' to get started!
          </Link>
        </div>
      )}
    </div>
  );
}

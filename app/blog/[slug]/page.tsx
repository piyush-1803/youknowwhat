'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { markdownToHtml } from '@/lib/markdown';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [contentHtml, setContentHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        
        const html = await markdownToHtml(data.content || '');
        setPost(data);
        setContentHtml(html);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-32">
        <div className="w-12 h-12 border-4 border-accent-2 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">404 - Post Not Found</h1>
        <Link href="/blog" className="text-accent-2 hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <Link href="/blog" className="text-sm font-mono text-white/40 hover:text-accent-2 transition-colors mb-12 inline-block">
        ← BACK TO BLOG
      </Link>

      <article>
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-mono text-white/40">
            <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>{Math.ceil(post.content?.split(' ').length / 200)} MIN READ</span>
          </div>
        </header>

        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <footer className="mt-20 pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-lg font-semibold">Share this exploration</h3>
            <div className="flex gap-4">
              <a 
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                target="_blank"
                className="px-6 py-2 glass rounded-full hover:bg-accent-2/20 border-white/5 hover:border-accent-2/30 transition-all"
              >
                Twitter / X
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`}
                target="_blank"
                className="px-6 py-2 glass rounded-full hover:bg-accent-1/20 border-white/5 hover:border-accent-1/30 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}

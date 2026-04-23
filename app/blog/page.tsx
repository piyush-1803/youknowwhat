'use client';

import { useState, useEffect } from 'react';
import BlogPostItem from '@/components/BlogPostItem';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchPosts();
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-white/50 text-lg max-w-2xl">
          Deep dives, technical breakdowns, and late-night thoughts.
        </p>
      </div>

      {loading ? (
        <div className="space-y-6 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 bg-white/5 rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="flex flex-col">
          {posts.map((post) => (
            <BlogPostItem 
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.created_at}
              slug={post.slug}
            />
          ))}
        </div>
      ) : (
        <div className="glass p-12 rounded-3xl border border-white/5 text-center">
          <p className="text-xl text-white/40 italic">
            "No blog posts yet. Thoughts coming soon!"
          </p>
        </div>
      )}
    </div>
  );
}

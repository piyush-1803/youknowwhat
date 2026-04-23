'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BlogForm from '@/components/BlogForm';

export default function EditBlogPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-2 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="glass p-12 rounded-3xl border border-white/5 text-center">
        <p className="text-xl text-white/40 italic">Blog post not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Edit Blog Post</h1>
        <p className="text-white/40 italic">Updating "{post.title}"</p>
      </div>

      <BlogForm initialData={post} isEditing={true} />
    </div>
  );
}

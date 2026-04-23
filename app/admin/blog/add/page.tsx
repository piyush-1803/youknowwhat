import BlogForm from '@/components/BlogForm';

export default function AddBlogPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">New Blog Post</h1>
        <p className="text-white/40 italic">Share your latest thoughts and discoveries</p>
      </div>

      <BlogForm />
    </div>
  );
}

import Link from 'next/link';

interface BlogPostItemProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const BlogPostItem = ({ title, excerpt, date, slug }: BlogPostItemProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="glass group p-8 rounded-2xl border border-white/5 hover:border-accent-2/30 transition-all duration-500 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-accent-2 transition-colors">
          {title}
        </h3>
        <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
          {formattedDate}
        </span>
      </div>

      <p className="text-white/50 mb-6 leading-relaxed">
        {excerpt}
      </p>

      <Link 
        href={`/blog/${slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent-2 hover:text-white transition-colors"
      >
        Read More <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  );
};

export default BlogPostItem;

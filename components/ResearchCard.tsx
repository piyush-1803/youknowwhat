import Link from 'next/link';

interface ResearchCardProps {
  title: string;
  description: string;
  status: 'idea' | 'in-progress' | 'published';
  pdfLink?: string;
}

const ResearchCard = ({ title, description, status, pdfLink }: ResearchCardProps) => {
  const statusColors = {
    'idea': 'bg-white/10 text-white/60 border-white/20',
    'in-progress': 'bg-accent-1/10 text-accent-1 border-accent-1/30',
    'published': 'bg-accent-2/10 text-accent-2 border-accent-2/30',
  };

  return (
    <div className="glass group p-6 rounded-2xl border border-white/5 hover:border-accent-1/30 transition-all duration-500">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-widest border ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-1 transition-colors">
        {title}
      </h3>

      <p className="text-sm text-white/50 mb-6 line-clamp-3">
        {description}
      </p>

      {pdfLink && (
        <Link 
          href={pdfLink}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-1 hover:text-white transition-colors"
        >
          Read Paper <span>→</span>
        </Link>
      )}
    </div>
  );
};

export default ResearchCard;

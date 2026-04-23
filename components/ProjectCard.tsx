import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
}

const ProjectCard = ({ title, description, tags, githubLink, demoLink }: ProjectCardProps) => {
  return (
    <div className="glass group relative p-6 rounded-2xl border border-white/5 hover:border-accent-1/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,217,255,0.1)]">
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-1 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-white/60 mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 bg-accent-1/5 border border-accent-1/20 rounded-md text-[10px] font-mono text-accent-1 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {githubLink && (
            <Link 
              href={githubLink}
              target="_blank"
              className="flex-1 text-center py-2 bg-white/5 hover:bg-accent-2/20 border border-white/10 hover:border-accent-2/50 rounded-lg text-xs font-semibold text-white transition-all duration-300"
            >
              GitHub
            </Link>
          )}
          {demoLink && (
            <Link 
              href={demoLink}
              target="_blank"
              className="flex-1 text-center py-2 bg-accent-2 hover:bg-accent-2/80 rounded-lg text-xs font-semibold text-black transition-all duration-300"
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center text-white/40 text-sm">
          <span>© {new Date().getFullYear()} YouKnowWhat.</span>
          <span className="hidden md:inline-block w-1 h-1 bg-white/20 rounded-full"></span>
          <span>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
        
        <div className="flex space-x-6">
          <a 
            href="https://github.com/piyush-1803" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-accent-1 transition-colors text-sm"
          >
            GitHub
          </a>
          <a 
            href="https://x.com/Amritam1801" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-accent-2 transition-colors text-sm"
          >
            X (Twitter)
          </a>
          <a 
            href="https://www.instagram.com/akashic.x/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-accent-1 transition-colors text-sm"
          >
            Instagram
          </a>
          <a 
            href="mailto:youknowwhat1803@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-accent-1 transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

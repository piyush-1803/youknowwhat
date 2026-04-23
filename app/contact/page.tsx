export default function ContactPage() {
  const socialLinks = [
    { name: 'GitHub', value: 'github.com/piyush-1803', href: 'https://github.com/piyush-1803', icon: '💻' },
    { name: 'X (Twitter)', value: '@Amritam1801', href: 'https://x.com/Amritam1801', icon: '🐦' },
    { name: 'Instagram', value: '@akashic.x', href: 'https://www.instagram.com/akashic.x/', icon: '📸' },
    { name: 'Email', value: 'youknowwhat1803@gmail.com', href: 'mailto:youknowwhat1803@gmail.com', icon: '✉️' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
        Get in Touch
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group p-6 rounded-2xl border border-white/5 hover:border-accent-1/50 transition-all duration-300 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-mono text-white/40 uppercase tracking-widest mb-1">{link.name}</p>
              <p className="text-lg font-medium group-hover:text-accent-1 transition-colors">{link.value}</p>
            </div>
            <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{link.icon}</span>
          </a>
        ))}
      </div>

      <div className="mt-20 glass p-8 rounded-3xl border border-white/5">
        <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
            />
          </div>
          <textarea 
            placeholder="Message" 
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-1 transition-colors"
          />
          <button 
            type="button"
            className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-accent-1 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

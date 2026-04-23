import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-1/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-2/10 blur-[120px] animate-pulse delay-700" />

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <div className="glass p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            I'm <span className="bg-gradient-to-r from-accent-1 via-accent-2 to-accent-1 bg-clip-text text-transparent animate-gradient">Piyush</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-10 font-light leading-relaxed">
            Architecting <span className="text-white font-medium">Agentic Systems</span> & exploring the intersection of <span className="text-accent-1">Physics</span> and <span className="text-accent-2">Vedic Wisdom</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/projects"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-accent-1 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-1/20"
            >
              View Projects
            </Link>
            <Link 
              href="/about"
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

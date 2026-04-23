export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
        About Me
      </h1>

      <div className="space-y-8 text-lg text-white/70 leading-relaxed">
        <p>
          I am a builder at heart, driven by a deep curiosity about how systems—both digital and cosmic—operate. 
          My work currently focuses on creating **Agentic AI systems** that don't just follow instructions but 
          actively solve complex problems in real-world environments.
        </p>
        
        <p>
          Beyond the terminal, I spend my time exploring the deep connections between modern **Physics** and 
          ancient **Vedic Astrology**. I believe the intersection of these two fields holds profound insights 
          into the nature of time, consciousness, and causality.
        </p>

        <section className="pt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Vedic Astrology",
              "Theoretical Physics",
              "AI / Agentic Systems",
              "Ancient Philosophy"
            ].map((interest) => (
              <div key={interest} className="glass p-4 rounded-xl border border-white/5 hover:border-accent-1/30 transition-colors">
                <span className="text-accent-1 mr-2">✦</span> {interest}
              </div>
            ))}
          </div>
        </section>

        <section className="pt-12 flex items-center gap-4">
          <span className="text-sm font-mono text-white/40 uppercase tracking-widest">Personality Type</span>
          <div className="px-4 py-1 bg-accent-2/10 border border-accent-2/30 rounded-full text-accent-2 text-sm font-bold">
            INFP-T
          </div>
        </section>
      </div>
    </div>
  );
}

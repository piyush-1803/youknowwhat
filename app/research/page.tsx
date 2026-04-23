'use client';

import { useState, useEffect } from 'react';
import ResearchCard from '@/components/ResearchCard';

interface Research {
  id: string;
  title: string;
  description: string;
  status: 'idea' | 'in-progress' | 'published';
  pdf_link: string;
}

export default function ResearchPage() {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const res = await fetch('/api/research');
        const data = await res.json();
        setResearch(data);
      } catch (error) {
        console.error('Error fetching research:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearch();
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
          Research
        </h1>
        <p className="text-white/50 text-lg max-w-2xl">
          Explorations into the frontier of AI, the foundations of Physics, and the mechanics of Vedic systems.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-white/5 rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : research.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {research.map((item) => (
            <ResearchCard 
              key={item.id}
              title={item.title}
              description={item.description}
              status={item.status}
              pdfLink={item.pdf_link}
            />
          ))}
        </div>
      ) : (
        <div className="glass p-12 rounded-3xl border border-white/5 text-center">
          <p className="text-xl text-white/40 italic">
            "No research yet. Ideas coming soon!"
          </p>
        </div>
      )}
    </div>
  );
}

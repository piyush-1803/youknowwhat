'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CVPage() {
  const [pdfError, setPdfError] = useState(false);

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
            Curriculum Vitae
          </h1>
          <p className="text-white/50 text-lg">My professional journey and technical expertise.</p>
        </div>
        
        <a 
          href="/cv.pdf" 
          download 
          className="px-8 py-3 bg-accent-1 text-black font-bold rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-accent-1/10"
        >
          Download PDF
        </a>
      </div>

      <div className="glass aspect-[1/1.4] w-full rounded-3xl border border-white/5 overflow-hidden relative">
        {!pdfError ? (
          <iframe 
            src="/cv.pdf" 
            className="w-full h-full border-none"
            onError={() => setPdfError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <span className="text-6xl mb-6">📄</span>
            <h2 className="text-2xl font-semibold mb-4">CV Coming Soon</h2>
            <p className="text-white/40 max-w-sm mb-8">
              I'm currently updating my resume with my latest explorations in Agentic AI. Check back shortly!
            </p>
            <Link href="/" className="text-accent-1 hover:underline">Return to Home</Link>
          </div>
        )}

        {/* Fallback overlay for browsers that don't support inline PDFs well */}
        <div className="absolute top-4 right-4 md:hidden">
           <span className="bg-black/50 backdrop-blur-md text-[10px] px-2 py-1 rounded text-white/60">
             Scroll to View
           </span>
        </div>
      </div>
    </div>
  );
}

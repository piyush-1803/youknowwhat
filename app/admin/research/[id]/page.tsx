'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ResearchForm from '@/components/ResearchForm';

export default function EditResearchPage() {
  const { id } = useParams();
  const [research, setResearch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      const { data, error } = await supabase
        .from('research')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching research:', error);
      } else {
        setResearch(data);
      }
      setLoading(false);
    };

    fetchResearch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-1 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!research) {
    return (
      <div className="glass p-12 rounded-3xl border border-white/5 text-center">
        <p className="text-xl text-white/40 italic">Research entry not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Edit Research</h1>
        <p className="text-white/40 italic">Updating "{research.title}"</p>
      </div>

      <ResearchForm initialData={research} isEditing={true} />
    </div>
  );
}

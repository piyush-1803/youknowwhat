'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProjectForm from '@/components/ProjectForm';

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-1 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="glass p-12 rounded-3xl border border-white/5 text-center">
        <p className="text-xl text-white/40 italic">Project not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Edit Project</h1>
        <p className="text-white/40 italic">Updating "{project.title}"</p>
      </div>

      <ProjectForm initialData={project} isEditing={true} />
    </div>
  );
}

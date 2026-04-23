'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setProjects(projects.filter(p => p.id !== id));
      alert('Project deleted successfully');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-white/40">Manage your work and showpieces</p>
        </div>
        <Link 
          href="/admin/projects/add"
          className="px-6 py-3 bg-accent-1 text-black font-bold rounded-xl hover:bg-white transition-all duration-300"
        >
          + Add Project
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl" />)}
        </div>
      ) : projects.length > 0 ? (
        <div className="overflow-hidden glass rounded-2xl border border-white/5">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-mono uppercase tracking-widest text-white/40">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4 hidden md:table-cell">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium">{project.title}</td>
                  <td className="px-6 py-4 hidden md:table-cell text-sm text-white/40 max-w-xs truncate">
                    {project.description}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link 
                        href={`/admin/projects/${project.id}`}
                        className="p-2 hover:text-accent-1 transition-colors"
                        title="Edit"
                      >
                        ✏️
                      </Link>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass p-12 rounded-3xl border border-white/5 text-center">
          <p className="text-xl text-white/40 italic mb-6">No projects yet.</p>
          <Link href="/admin/projects/add" className="text-accent-1 hover:underline">
            Click '+ Add Project' to get started!
          </Link>
        </div>
      )}
    </div>
  );
}

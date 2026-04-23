'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_link: string;
  demo_link: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchProjects();
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-white/50 text-lg max-w-2xl">
          A collection of my work spanning AI, systems architecture, and exploratory research.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white/5 rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              githubLink={project.github_link}
              demoLink={project.demo_link}
            />
          ))}
        </div>
      ) : (
        <div className="glass p-12 rounded-3xl border border-white/5 text-center">
          <p className="text-xl text-white/40 italic">
            "No projects yet. Check back soon!"
          </p>
        </div>
      )}
    </div>
  );
}

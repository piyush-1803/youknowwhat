import ProjectForm from '@/components/ProjectForm';

export default function AddProjectPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Add New Project</h1>
        <p className="text-white/40 italic">Add a new masterpiece to your portfolio</p>
      </div>

      <ProjectForm />
    </div>
  );
}

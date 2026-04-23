import ResearchForm from '@/components/ResearchForm';

export default function AddResearchPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Add New Research</h1>
        <p className="text-white/40 italic">Document your latest exploration</p>
      </div>

      <ResearchForm />
    </div>
  );
}

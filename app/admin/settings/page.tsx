export default function AdminSettingsPage() {
  const sections = [
    { title: 'Site Settings', description: 'Configure global metadata, SEO, and visibility.', status: 'Coming Soon' },
    { title: 'Profile Settings', description: 'Update your bio, name, and social links.', status: 'Coming Soon' },
    { title: 'Integrations', description: 'Connect third-party tools and analytics.', status: 'Coming Soon' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-white/40 italic">Control your platform</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="glass p-8 rounded-3xl border border-white/5 opacity-50 cursor-not-allowed">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-white/40 uppercase tracking-widest">
                {section.status}
              </span>
            </div>
            <p className="text-white/40 text-sm">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

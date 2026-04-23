import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data || []);
}

export async function POST(req: Request) {
  const { title, description, github_link, demo_link, tags } = await req.json();
  const { data, error } = await supabase.from('projects').insert([
    { title, description, github_link, demo_link, tags }
  ]).select();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

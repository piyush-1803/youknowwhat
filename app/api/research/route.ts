import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('research')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data || []);
}

export async function POST(req: Request) {
  const { title, description, status, pdf_link } = await req.json();
  const { data, error } = await supabase.from('research').insert([
    { title, description, status, pdf_link }
  ]).select();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

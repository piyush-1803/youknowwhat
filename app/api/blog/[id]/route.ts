import { supabase } from '@/lib/supabase';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('blog_posts')
    .update(body)
    .eq('id', params.id)
    .select();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', params.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}

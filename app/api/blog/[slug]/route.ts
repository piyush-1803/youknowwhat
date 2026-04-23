import { supabase } from '@/lib/supabase';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error) return Response.json({ error: 'Post not found' }, { status: 404 });
  return Response.json(data);
}

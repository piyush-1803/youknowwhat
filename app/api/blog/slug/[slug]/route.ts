import { supabase } from '@/lib/supabase';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return Response.json({ error: 'Post not found' }, { status: 404 });
  return Response.json(data);
}

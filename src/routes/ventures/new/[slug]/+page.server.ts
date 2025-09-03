import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const { slug } = params;

  const { data: venture, error } = await locals.supabase
    .from('ventures')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !venture) {
    return { status: 404, error: 'Venture not found' };
  }

  return { venture };
};

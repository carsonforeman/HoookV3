// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
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

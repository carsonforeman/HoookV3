import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
  // End Supabase session
  await locals.supabase.auth.signOut();

  locals.session = null;
  locals.profile = null;

  throw redirect(303, '/');
};

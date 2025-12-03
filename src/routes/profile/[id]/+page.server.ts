// src/routes/myprofile/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return { profile: null, ventures: [], error: 'Not signed in' };
  }

  // Fetch profile
  const { data: profile, error: profileError } = await locals.supabase
    .from('profiles')
    .select('id, first_name, last_name, state, role, avatar_url')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Profile fetch error:', profileError.message);
    return { profile: null, ventures: [], error: profileError.message };
  }

  // Fetch ventures owned by this user
  const { data: ventures, error: venturesError } = await locals.supabase
    .from('ventures')
    .select('id, slug, name, about, logo_url, type, location')
    .eq('owner_id', user.id);

  if (venturesError) {
    console.error('Ventures fetch error:', venturesError.message);
  }

  return {
    profile,
    ventures: ventures || []
  };
};

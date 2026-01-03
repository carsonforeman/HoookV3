// src/routes/profile/[username]/+page.server.ts
import type { PageServerLoad } from '../../profile/[username]/$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const { username } = params;

  // Fetch public profile
  const { data: profile, error: profileError } = await locals.supabase
    .from('profiles')
    .select(`
      id,
      username,
      first_name,
      last_name,
      state,
      avatar_url,
      instagram_url,
      linkedin_url,
      tiktok_url,
      collaboration_intent
    `)
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    return {
      profile: null,
      ventures: []
    };
  }

  // Fetch ventures for this user
  const { data: ventures, error: venturesError } = await locals.supabase
    .from('ventures')
    .select(`
      id,
      name,
      slug,
      about
    `)
    .eq('owner_id', profile.id);

  if (venturesError) {
    console.error('Ventures fetch error:', venturesError.message);
  }

  return {
    profile,
    ventures: ventures ?? []
  };
};

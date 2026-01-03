// @ts-nocheck
// src/routes/profile/[username]/+page.server.ts
import type { PageServerLoad } from './$types';

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
  const { username } = params;

  const { data: profiles, error: profileError } = await locals.supabase
    .from('profiles')
    .select('*')
    .eq('username', username);

  console.log('PUBLIC PROFILE QUERY', {
    username,
    profiles,
    profileError
  });

  if (profileError) {
    return {
      profile: null,
      ventures: [],
      debug: profileError.message
    };
  }

  if (!profiles || profiles.length === 0) {
    return {
      profile: null,
      ventures: [],
      debug: 'No rows returned'
    };
  }

  const profile = profiles[0];

  const { data: ventures, error: venturesError } = await locals.supabase
    .from('ventures')
    .select('*')
    .eq('owner_id', profile.id);

  if (venturesError) {
    console.error('Ventures fetch error:', venturesError.message);
  }

  return {
    profile,
    ventures: ventures ?? []
  };
};

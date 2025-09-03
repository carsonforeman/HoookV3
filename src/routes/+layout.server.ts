import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user,       // coming from hooks.server.ts / supabase
    profile: locals.profile
  };
};

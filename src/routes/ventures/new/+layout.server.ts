import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Grab user and profile from locals (same as landing page)
  return {
    user: locals.session?.user ?? null,
    profile: locals.profile ?? null
  };
};

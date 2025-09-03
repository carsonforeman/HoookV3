// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
  // Grab user and profile from locals (same as landing page)
  return {
    user: locals.session?.user ?? null,
    profile: locals.profile ?? null
  };
};

// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
  return {
    user: locals.user,       // coming from hooks.server.ts / supabase
    profile: locals.profile
  };
};

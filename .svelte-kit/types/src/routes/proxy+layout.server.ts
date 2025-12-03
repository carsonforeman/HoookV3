// @ts-nocheck
import type { LayoutServerLoad } from "./$types";

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
  return {
    user: locals.user ?? null,
    profile: locals.profile ?? null
  };
};

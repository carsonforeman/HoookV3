// @ts-nocheck
// /src/routes/ventures/[slug]/(owner)/+layout.server.ts
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = async ({ params, locals }: Parameters<LayoutServerLoad>[0]) => {
  const { slug } = params;

  // Fetch venture
  const { data: venture } = await locals.supabase
    .from("ventures")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!venture) redirect(302, "/ventures");

  // Only owner can view
  if (!locals.user || locals.user.id !== venture.uid) {
    redirect(302, `/ventures/${slug}`);
  }

  return { venture };
};

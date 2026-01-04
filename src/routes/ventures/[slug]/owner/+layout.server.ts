import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ params, locals }) => {
  const { slug } = params;

  const { data: venture, error } = await locals.supabase
    .from("ventures")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !venture) {
    throw redirect(302, "/ventures");
  }

  if (!locals.user || locals.user.id !== venture.owner_id) {
    throw redirect(302, `/ventures/${slug}`);
  }

  return { venture };
};

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const { supabase } = locals;

  const { data } = await supabase
    .from("team")
    .select("*")
    .eq("venture_slug", params.slug)
    .order("created_at", { ascending: true });

  return {
    team: data ?? []
  };
};

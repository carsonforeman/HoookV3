import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const { supabase } = locals;

  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("venture_slug", params.slug)
    .order("created_at", { ascending: false });

  return {
    progress: data ?? []
  };
};

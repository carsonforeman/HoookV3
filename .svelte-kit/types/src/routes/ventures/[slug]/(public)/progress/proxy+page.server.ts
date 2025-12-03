// @ts-nocheck
import type { PageServerLoad } from "./$types";

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
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

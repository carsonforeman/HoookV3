// @ts-nocheck
import type { PageServerLoad } from "./$types";

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
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

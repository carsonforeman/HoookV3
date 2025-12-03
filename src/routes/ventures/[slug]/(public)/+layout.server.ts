import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
  const { supabase, user } = locals;

  const { data: venture, error: ventureErr } = await supabase
    .from("ventures")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (ventureErr || !venture) {
    throw error(404, "Venture not found");
  }

  return {
    venture,
    user // required for owner detection
  };
};

import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
  const { supabase, user } = locals;

  // Fetch venture
  const { data: venture, error: ventureError } = await supabase
    .from("ventures")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (ventureError || !venture) {
    throw error(404, "Venture not found");
  }

  // IMPORTANT:
  // Public view MUST NOT block access.
  // It simply loads the venture AND the current user.

  return {
    venture,
    user // <-- PUBLIC LAYOUT NEEDS THIS FOR OWNER BUTTON!
  };
};

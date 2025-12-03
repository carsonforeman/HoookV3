import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  const { supabase } = locals;

  const { data } = await supabase
    .from("sessions")
    .select("*")
    .eq("venture_slug", params.slug)
    .order("created_at", { ascending: false });

  return {
    sessions: data ?? []
  };
};

export const actions: Actions = {
  create: async ({ request, params, locals }) => {
    const { supabase } = locals;
    const form = await request.formData();

    const title = form.get("title");

    if (!title) return fail(400, { error: "Title required" });

    await supabase.from("sessions").insert({
      title,
      venture_slug: params.slug
    });

    return { success: true };
  }
};

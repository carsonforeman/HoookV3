import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const user = locals.user ?? null;

  if (!user) {
    return {
      user: null,
      viewerProfile: null
    };
  }

  const { data: viewerProfile, error } = await locals.supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("viewerProfile load error:", error.message);
  }

  return {
    user,
    viewerProfile: viewerProfile ?? null
  };
};

import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
  const user = locals.user;
  if (!user) {
    throw redirect(302, "/login");
  }

  const { slug } = params;

  // 1️⃣ Load venture ONLY
  const { data: venture, error: ventureError } = await locals.supabase
    .from("ventures")
    .select("id, slug, name, owner_id")
    .eq("slug", slug)
    .single();

  if (ventureError || !venture) {
    throw redirect(302, "/ventures");
  }

  if (venture.owner_id !== user.id) {
    throw redirect(302, `/ventures/${slug}`);
  }

  // 2️⃣ Load owner profile SEPARATELY (safe)
  const { data: ownerProfile } = await locals.supabase
    .from("profiles")
    .select("id, avatar_url, full_name")
    .eq("id", venture.owner_id)
    .single();

  // 3️⃣ Load artifacts
  const { data: artifacts, error: artifactsError } = await locals.supabase
    .from("artifacts")
    .select(`
      id,
      name,
      description,
      status,
      created_at,
      artifact_files (
        id,
        file_path,
        file_type,
        name,
        description
      )
    `)
    .eq("venture_id", venture.id)
    .order("created_at", { ascending: false });

  if (artifactsError) {
    console.error("Failed to load artifacts:", artifactsError);
  }

  return {
    venture: {
      id: venture.id,
      slug: venture.slug,
      name: venture.name
    },
    ownerProfile: ownerProfile ?? null,
    artifacts: artifacts ?? []
  };
};

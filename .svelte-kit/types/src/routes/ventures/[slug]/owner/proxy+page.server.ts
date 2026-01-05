// @ts-nocheck
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals, params }: Parameters<PageServerLoad>[0]) => {
  const user = locals.user;
  if (!user) {
    throw redirect(302, "/login");
  }

  const { slug } = params;

  // Load venture
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

  // Load owner profile
  const { data: ownerProfile } = await locals.supabase
    .from("profiles")
    .select("id, avatar_url, full_name")
    .eq("id", venture.owner_id)
    .single();

  // Load artifacts
  const { data: artifacts } = await locals.supabase
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

export const actions = {
  default: async ({ request, params, locals }: import('./$types').RequestEvent) => {
    const user = locals.user;
    if (!user) return fail(401);

    const { slug } = params;
    const formData = await request.formData();

    // ---------- FILE (LOGO) ----------
const logoFile = formData.get("logo") as File | null;
let logo_url: string | undefined;

if (logoFile && logoFile.size > 0) {
  const ext = logoFile.name.split(".").pop();
  const path = `${slug}.${ext}`; // clean + predictable

  const { error: uploadError } = await locals.supabase.storage
    .from("venture-logos") // ✅ YOUR BUCKET
    .upload(path, logoFile, {
      upsert: true,
      contentType: logoFile.type
    });

  if (uploadError) {
    console.error("Logo upload failed:", uploadError);
    return fail(500, { error: "Logo upload failed" });
  }

  const { data } = locals.supabase.storage
    .from("venture-logos")
    .getPublicUrl(path);

  logo_url = data.publicUrl;
}


    // ---------- SAFE UPDATE OBJECT ----------
    const update: Record<string, any> = {};

    const name = formData.get("name");
    const type = formData.get("type");
    const location = formData.get("location");
    const about = formData.get("about");
    const website = formData.get("website_url");
    const instagram = formData.get("instagram_url");
    const tiktok = formData.get("tiktok_url");

    if (name) update.name = name;
    if (type) update.type = type;
    if (about) update.about = about;
    if (website) update.website_url = website;
    if (instagram) update.instagram_url = instagram;
    if (tiktok) update.tiktok_url = tiktok;

    // Only update location IF user selected one
    if (location && location !== "") {
      update.location = location;
    }

    // Only update logo IF uploaded
    if (logo_url) {
      update.logo_url = logo_url;
    }

    // Nothing to update → bail early
    if (Object.keys(update).length === 0) {
      return { success: true };
    }

    const { error } = await locals.supabase
      .from("ventures")
      .update(update)
      .eq("slug", slug)
      .eq("owner_id", user.id);

    if (error) {
      console.error("Update venture failed:", error);
      return fail(500, { error: "Failed to update venture" });
    }

    return { success: true };
  }
};
;null as any as Actions;
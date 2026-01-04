// @ts-nocheck
import type { Actions, PageServerLoad } from "./$types";
import { redirect, fail } from "@sveltejs/kit";

export const load = async ({ locals, params }: Parameters<PageServerLoad>[0]) => {
  const user = locals.user;
  if (!user) throw redirect(302, "/login");

  const { data: venture } = await locals.supabase
    .from("ventures")
    .select("id, owner_id")
    .eq("slug", params.slug)
    .single();

  if (!venture || venture.owner_id !== user.id) {
    throw redirect(302, `/ventures/${params.slug}`);
  }

  return {};
};

export const actions = {
  default: async ({ request, locals, params }: import('./$types').RequestEvent) => {
    console.log("🔥 ACTION START");

    const user = locals.user;
    if (!user) return fail(401);

    const form = await request.formData();

    const name = form.get("artifact_name") as string;
    const description = form.get("artifact_description") as string;

    if (!name || name.trim().length === 0) {
      return fail(400, { error: "Artifact name required" });
    }

    const { data: venture } = await locals.supabase
      .from("ventures")
      .select("id, owner_id")
      .eq("slug", params.slug)
      .single();

    if (!venture || venture.owner_id !== user.id) {
      return fail(403);
    }

    // -------------------------
    // CREATE ARTIFACT
    // -------------------------
    const { data: artifact, error: artifactError } = await locals.supabase
      .from("artifacts")
      .insert({
        venture_id: venture.id,
        created_by: user.id,
        name,
        description
      })
      .select()
      .single();

    if (artifactError || !artifact) {
      return fail(500, { error: artifactError?.message });
    }

    // -------------------------
    // HANDLE FILES
    // -------------------------
    const files = form.getAll("files") as File[];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || file.size === 0) continue;

      const fileName = form.get(`file_name_${i}`) as string;
      const fileDescription = form.get(`file_description_${i}`) as string;

      const ext = file.name.split(".").pop();
      const storagePath = `${venture.id}/${artifact.id}/${crypto.randomUUID()}.${ext}`;

      const upload = await locals.supabase.storage
        .from("artifact-files")
        .upload(storagePath, file);

      if (upload.error) {
        return fail(500, { error: upload.error.message });
      }

      // ✅ THIS IS THE CRITICAL FIX
      const { data: publicUrl } = locals.supabase.storage
        .from("artifact-files")
        .getPublicUrl(storagePath);

      await locals.supabase.from("artifact_files").insert({
        artifact_id: artifact.id,
        file_path: publicUrl.publicUrl, // ✅ FULL URL
        file_name: file.name,
        file_type: file.type,
        name: fileName || null,
        description: fileDescription || null
      });
    }

    throw redirect(303, `/ventures/${params.slug}/owner`);
  }
};
;null as any as Actions;
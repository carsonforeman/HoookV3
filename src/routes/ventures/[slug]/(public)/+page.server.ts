// +page.server.ts
import type { Actions, PageServerLoad } from "../$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  console.log("📥 [SHOWCASE LOAD] Fired");
  console.log("📌 params.slug =", params.slug);

  const { supabase } = locals;

  // Load showcase items for this venture
  const { data: showcase, error } = await supabase
    .from("showcase")
    .select("*")
    .eq("venture_slug", params.slug)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("❌ [SHOWCASE LOAD ERROR]", error);
  } else {
    console.log("📤 [SHOWCASE LOAD] Loaded items:", showcase.length);
  }

  return {
    showcase: showcase ?? []
  };
};

export const actions: Actions = {
  uploadShowcase: async ({ request, params, locals }) => {
    console.log("🔥 [UPLOAD] Action fired!");
    console.log("📌 params.slug =", params.slug);

    const { supabase } = locals;
    const form = await request.formData();

    const file = form.get("file") as File;
    const title = form.get("title") as string;

    // Validate file
    if (!file) {
      console.log("❌ No file in upload");
      return fail(400, { error: "File required" });
    }

    console.log("📦 File received:", {
      fileName: file.name,
      fileType: file.type,
      size: file.size
    });

    // -------------------------
    // 1️⃣ Lookup venture_id via slug
    // -------------------------
    const { data: venture, error: ventureErr } = await supabase
      .from("ventures")
      .select("id")
      .eq("slug", params.slug)
      .single();

    if (ventureErr || !venture) {
      console.log("❌ [VENTURE LOOKUP ERROR]", ventureErr);
      return fail(500, { error: "Unable to find venture" });
    }

    console.log("🔗 Found venture_id:", venture.id);

    // -------------------------
    // 2️⃣ Upload to Supabase Storage
    // -------------------------
    const ext = file.name.split(".").pop();
    const path = `${params.slug}/${crypto.randomUUID()}.${ext}`;

    console.log("📁 Uploading to bucket 'showcase' at path:", path);

    const { error: uploadErr } = await supabase.storage
      .from("showcase")
      .upload(path, file);

    if (uploadErr) {
      console.log("❌ [STORAGE UPLOAD ERROR]", uploadErr);
      return fail(500, { error: "Upload failed" });
    }

    console.log("✅ File uploaded!");

    // -------------------------
    // 3️⃣ Generate public URL
    // -------------------------
    const { data: publicUrl } = supabase.storage
      .from("showcase")
      .getPublicUrl(path);

    console.log("🌎 Public URL:", publicUrl);

    // Determine media type
    const type = file.type.startsWith("audio")
      ? "audio"
      : file.type.startsWith("image")
      ? "image"
      : "other";

    // -------------------------
    // 4️⃣ Insert database row (with venture_id AND slug)
    // -------------------------
    console.log("📝 Inserting into showcase table...");

    const { error: dbErr } = await supabase.from("showcase").insert({
      title: title || null,
      file_url: publicUrl.publicUrl,
      type,
      venture_slug: params.slug,
      venture_id: venture.id          // <-- IMPORTANT FIX
    });

    if (dbErr) {
      console.log("❌ [DB INSERT ERROR]", dbErr);
      return fail(500, { error: "Database insert failed" });
    }

    console.log("🎉 Showcase item successfully inserted!");

    return { success: true };
  }
};

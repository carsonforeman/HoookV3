// src/routes/ventures/new/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();

    // Get authenticated user
    const uid = locals.session?.user?.id ?? locals.user?.id;
    if (!uid) {
      return fail(401, { error: "Not authenticated" });
    }

    // Extract required fields
    const name = (form.get("name") as string)?.trim();
    const about = (form.get("about") as string)?.trim();
    const stage = (form.get("stage") as string)?.trim();
    const type = (form.get("type") as string)?.trim();
    const location = (form.get("location") as string)?.trim();
    const slug = (form.get("slug") as string)?.trim();

    // Seeking = multi-select checkboxes
    const seeking = form.getAll("seeking") as string[];

    // Validate required fields
    if (!name || !about || !stage || !type || !location || !slug) {
      return fail(400, { error: "All fields except logo are required." });
    }

    if (!Array.isArray(seeking) || seeking.length === 0) {
      return fail(400, { error: "Please select at least one seeking option." });
    }

    // Optional logo upload
    let logo_url: string | null = null;
    const logo = form.get("logo") as File | null;

    if (logo && logo.size > 0) {
      try {
        const buf = Buffer.from(await logo.arrayBuffer());
        const ext = logo.name.split(".").pop();
        const path = `${slug}-${Date.now()}.${ext}`;

        // Upload to Supabase storage
        const { error: uploadErr } = await locals.supabase.storage
          .from("venture-logos")
          .upload(path, buf, {
            contentType: logo.type,
            upsert: true
          });

        if (uploadErr) {
          console.error("Logo upload failed:", uploadErr);
          return fail(500, { error: "Logo upload failed." });
        }

        const { data: urlData } = locals.supabase.storage
          .from("venture-logos")
          .getPublicUrl(path);

        logo_url = urlData.publicUrl;
      } catch (err) {
        console.error("Unexpected logo error:", err);
        return fail(500, { error: "Error processing logo file." });
      }
    }

    // Insert venture into database
    const { error: dbError } = await locals.supabase.from("ventures").insert({
      uid,
      name,
      slug,
      about,
      stage,
      type,
      location,
      seeking,
      logo_url
    });

    if (dbError) {
      console.error("Venture insert failed:", dbError);
      return fail(500, { error: "Failed to create venture." });
    }

    // Redirect to the new venture page
    throw redirect(303, `/ventures/${slug}`);
  }
};

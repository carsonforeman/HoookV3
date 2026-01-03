import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, locals }) => {
    console.log("🔥 CREATE VENTURE ACTION HIT");

    const form = await request.formData();

    // 1️⃣ Auth check
    const user = locals.user;
    if (!user) {
      return fail(401, { error: "Not authenticated" });
    }

    // 2️⃣ Extract fields
    const name = (form.get("name") as string)?.trim();
    const slug = (form.get("slug") as string)?.trim();
    const type = (form.get("type") as string)?.trim();
    const stage = (form.get("stage") as string)?.trim();
    const about = (form.get("about") as string)?.trim();
    const location = (form.get("location") as string)?.trim();

    console.log("FORM VALUES", {
  name,
  slug,
  type,
  stage,
  about,
  location
});


    // 3️⃣ Validate required fields
    if (!name || !slug || !type || !stage || !about || !location) {
      return fail(400, { error: "Missing required fields." });
    }

    // 4️⃣ Optional logo upload
    let logo_url: string | null = null;
    const logo = form.get("logo") as File | null;

    if (logo && logo.size > 0) {
      try {
        const buffer = Buffer.from(await logo.arrayBuffer());
        const ext = logo.name.split(".").pop();
        const filePath = `ventures/${slug}-${Date.now()}.${ext}`;

        const { error: uploadError } = await locals.supabase.storage
          .from("venture-logos")
          .upload(filePath, buffer, {
            contentType: logo.type,
            upsert: true
          });

        if (uploadError) {
          console.error("Logo upload failed:", uploadError.message);
          return fail(500, { error: "Failed to upload logo." });
        }

        const { data: publicUrl } = locals.supabase.storage
          .from("venture-logos")
          .getPublicUrl(filePath);

        logo_url = publicUrl.publicUrl;
      } catch (err) {
        console.error("Logo processing error:", err);
        return fail(500, { error: "Error processing logo file." });
      }
    }

    // 5️⃣ Insert venture
    const { error: insertError } = await locals.supabase
      .from("ventures")
      .insert({
        owner_id: user.id,
        name,
        slug,
        type,
        stage,
        about,
        location,
        logo_url
      });

    if (insertError) {
      console.error("Venture insert failed:", insertError.message);
      return fail(500, { error: "Failed to create venture." });
    }

    // 6️⃣ Redirect to venture page
    throw redirect(303, `/ventures/${slug}`);
  }
};

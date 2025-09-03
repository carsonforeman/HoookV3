// src/routes/ventures/new/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    // 🔒 Auth check
    const uid = locals.user?.id;
    if (!uid) {
      return fail(401, { error: 'Not authenticated' });
    }

    // 📝 Extract fields
    const stage = formData.get('stage') as string | null;
    const category = formData.get('category') as string | null;
    const type = formData.get('type') as string | null;          // <-- NEW
    const location = formData.get('location') as string | null;
    const name = formData.get('name') as string | null;
    const about = formData.get('about') as string | null;
    const seeking = formData.getAll('seeking') as string[];
    const logo = formData.get('logo') as File | null;

    if (!stage || !category || !type || !location || !name || !about) {
      return fail(400, { error: 'Missing required fields' });
    }

    // 🐌 Generate slug
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let logo_url: string | null = null;

    // 🖼 Handle logo upload if provided
    if (logo && logo.size > 0) {
      try {
        const arrayBuffer = await logo.arrayBuffer();
        const fileExt = logo.name.split('.').pop();
        const filePath = `${slug}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await locals.supabase.storage
          .from('venture-logos')
          .upload(filePath, new Uint8Array(arrayBuffer), {
            contentType: logo.type,
            upsert: true
          });

        if (uploadError) {
          console.error('Logo upload failed:', uploadError);
          return fail(500, { error: 'Logo upload failed' });
        }

        const { data } = locals.supabase.storage
          .from('venture-logos')
          .getPublicUrl(filePath);

        logo_url = data.publicUrl;
      } catch (err) {
        console.error('Unexpected logo handling error:', err);
        return fail(500, { error: 'Logo processing failed' });
      }
    }

    // 💾 Insert into DB
    const { error } = await locals.supabase.from('ventures').insert({
      uid,
      stage,
      category,
      type,               // <-- ADDED HERE
      location,
      name,
      slug,
      about,
      seeking,
      logo_url
    });

    if (error) {
      console.error('Error inserting venture:', error);
      return fail(500, { error: 'Database insert failed' });
    }

    // 🚀 Redirect to new venture page
    throw redirect(303, `/ventures/${slug}`);
  }
};

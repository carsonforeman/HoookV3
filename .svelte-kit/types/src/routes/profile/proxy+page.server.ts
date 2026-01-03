// @ts-nocheck
// src/routes/profile/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const user = locals.user;

  if (!user) {
    throw redirect(302, '/auth/login');
  }

  const { data: profile, error } = await locals.supabase
    .from('profiles')
    .select(`
      id,
      username,
      first_name,
      last_name,
      state,
      avatar_url,
      instagram_url,
      linkedin_url,
      tiktok_url,
      collaboration_intent
    `)
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    console.error('Profile fetch error:', error?.message);
    return { profile: null, ventures: [] };
  }

  return {
    profile,
    ventures: []
  };
};

export const actions = {
  default: async ({ request, locals }: import('./$types').RequestEvent) => {
    const user = locals.user;

    if (!user) {
      return fail(401, { error: 'Not authenticated' });
    }

    const formData = await request.formData();

    const state = formData.get('state') as string | null;
    const instagram_url = formData.get('instagram_url') as string | null;
    const linkedin_url = formData.get('linkedin_url') as string | null;
    const tiktok_url = formData.get('tiktok_url') as string | null;
    const collaboration_intent = formData.get('collaboration_intent') as string | null;
    const avatar = formData.get('avatar') as File | null;

    let avatar_url: string | null = null;

    if (avatar && avatar.size > 0) {
      const fileExt = avatar.name.split('.').pop();
      const filePath = `${user.id}.${fileExt}`;

      const { error: uploadError } = await locals.supabase.storage
        .from('avatars')
        .upload(filePath, avatar, {
          upsert: true,
          contentType: avatar.type
        });

      if (uploadError) {
        console.error('Avatar upload error:', uploadError.message);
        return fail(500, { error: 'Failed to upload avatar' });
      }

      const { data: publicUrlData } = locals.supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      avatar_url = publicUrlData.publicUrl;
    }

    const { error: updateError } = await locals.supabase
      .from('profiles')
      .update({
        ...(state ? { state } : {}),
        ...(instagram_url !== null ? { instagram_url } : {}),
        ...(linkedin_url !== null ? { linkedin_url } : {}),
        ...(tiktok_url !== null ? { tiktok_url } : {}),
        ...(collaboration_intent !== null ? { collaboration_intent } : {}),
        ...(avatar_url ? { avatar_url } : {})
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Profile update error:', updateError.message);
      return fail(500, { error: 'Failed to update profile' });
    }

    return { success: true };
  }
};
;null as any as Actions;
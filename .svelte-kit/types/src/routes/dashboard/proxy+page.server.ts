// @ts-nocheck
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  const user = locals.user;
  if (!user) {
    return { profile: null, ventures: [], error: 'Not signed in' };
  }

  // ✅ Fetch profile
  const { data: profile, error: profileError } = await locals.supabase
    .from('profiles')
    .select('id, first_name, last_name, state, role, avatar_url')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError.message);
    return { profile: null, ventures: [], error: profileError.message };
  }

  // ✅ Fetch ventures owned by this user
  const { data: ventures, error: venturesError } = await locals.supabase
    .from('ventures')
    .select('id, name, description')
    .eq('owner_id', user.id);

  if (venturesError) {
    console.error('Error fetching ventures:', venturesError.message);
  }

  return {
    profile,
    ventures: ventures || []
  };
};

export const actions = {
  updateProfile: async ({ request, locals }: import('./$types').RequestEvent) => {
    const user = locals.user;
    if (!user) return { error: 'Not signed in' };

    const formData = await request.formData();
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const state = formData.get('state') as string;
    const role = formData.get('role') as string;

    // Handle avatar upload (if provided)
    const avatarFile = formData.get('avatar') as File | null;
    let avatar_url: string | undefined;

    if (avatarFile && avatarFile.size > 0) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await locals.supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError.message);
        return { error: uploadError.message };
      }

      const { data: publicUrl } = locals.supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      avatar_url = publicUrl.publicUrl;
    }

    // ✅ Update profile
    const { error } = await locals.supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        state,
        role,
        ...(avatar_url ? { avatar_url } : {})
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error.message);
      return { error: error.message };
    }

    return { success: true };
  }
};
;null as any as Actions;
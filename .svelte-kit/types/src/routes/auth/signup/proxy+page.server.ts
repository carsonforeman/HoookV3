// @ts-nocheck
// /src/routes/auth/signup/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
  return {};
};

export const actions = {
  default: async ({ request, locals }: import('./$types').RequestEvent) => {
    const formData = await request.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const state = formData.get('state') as string;
    const role = formData.get('role') as string;
    const avatar = formData.get('avatar') as File | null;

    if (!email || !password || !first_name || !last_name) {
      return fail(400, { error: 'Missing required fields' });
    }

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await locals.supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      console.error(authError);
      return fail(400, { error: authError.message });
    }

    const user = authData.user;
    const session = authData.session;

    if (!user) {
      return fail(500, { error: 'User not created' });
    }

    // ✅ Important: if email confirmations are disabled, we get a session now
    if (session) {
      await locals.supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token
      });
    }

    let avatar_url: string | null = null;

    // 2. If avatar uploaded, put it in storage
    if (avatar && avatar.size > 0) {
      const fileExt = avatar.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await locals.supabase.storage
        .from('avatars')
        .upload(filePath, avatar, { upsert: true });

      if (uploadError) {
        console.error('Avatar upload error:', uploadError.message);
      } else {
        const { data: publicUrl } = locals.supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        avatar_url = publicUrl.publicUrl;
      }
    }

    // 3. Update the profile row (trigger already inserted it)
    const { error: profileError } = await locals.supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        state,
        role,
        avatar_url
      })
      .eq('id', user.id);

    if (profileError) {
      console.error('Profile update error:', profileError.message);
      return fail(500, { error: profileError.message });
    }

    // 4. Redirect to homepage or dashboard
    throw redirect(303, '/');
  }
};
;null as any as PageServerLoad;;null as any as Actions;
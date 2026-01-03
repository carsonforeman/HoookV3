// /src/routes/auth/signup/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const state = formData.get('state') as string;

    if (!email || !password || !first_name || !last_name || !state) {
      return fail(400, { error: 'Missing required fields' });
    }

    // 1️⃣ Create user in Supabase Auth
    const { data: authData, error: authError } =
      await locals.supabase.auth.signUp({
        email,
        password
      });

    if (authError) {
      console.error('Auth signup error:', authError.message);
      return fail(400, { error: authError.message });
    }

    const user = authData.user;
    const session = authData.session;

    if (!user) {
      return fail(500, { error: 'User not created' });
    }

    // 2️⃣ If email confirmation is disabled, set session
    if (session) {
      await locals.supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token
      });
    }

    // 3️⃣ Generate username (required because NOT NULL)
    const baseUsername =
      `${first_name}-${last_name}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    const username = `${baseUsername}-${user.id.slice(0, 6)}`;

    // 4️⃣ Update profile row
    const { error: profileError } = await locals.supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        state,
        username
      })
      .eq('id', user.id);

    if (profileError) {
      console.error('Profile update error:', profileError.message);
      return fail(500, { error: profileError.message });
    }

    // 5️⃣ Redirect after successful signup
    throw redirect(303, '/');
  }
};

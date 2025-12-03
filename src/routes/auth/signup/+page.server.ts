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

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } =
      await locals.supabase.auth.signUp({
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

    // If email confirmations are disabled, a session exists
    if (session) {
      await locals.supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token
      });
    }

    // 2. Update the profile row (trigger created base row)
    const { error: profileError } = await locals.supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        state
      })
      .eq('id', user.id);

    if (profileError) {
      console.error('Profile update error:', profileError.message);
      return fail(500, { error: profileError.message });
    }

    // 3. Redirect user after signup
    throw redirect(303, '/');
  }
};

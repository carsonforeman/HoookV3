// /src/routes/auth/signin/+page.server.ts
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

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required' });
    }

    // 1. Log the user in with Supabase Auth
    const { data, error } = await locals.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error(error);
      return fail(400, { error: error.message });
    }

    const session = data.session;
    if (!session) {
      return fail(500, { error: 'No session returned after login' });
    }

    // 2. Store the session cookie (critical for server-side auth)
    await locals.supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token
    });

    // 3. Redirect to homepage (header will update now)
    throw redirect(303, '/');
  }
};

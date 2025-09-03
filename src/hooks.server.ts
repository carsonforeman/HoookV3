// src/hooks.server.ts
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Create Supabase client with cookies for SSR
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) =>
          event.cookies.set(key, value, { ...options, path: '/' }),
        remove: (key, options) =>
          event.cookies.delete(key, { ...options, path: '/' })
      }
    }
  );

  // 🔑 Fetch authenticated user
  const {
    data: { user }
  } = await event.locals.supabase.auth.getUser();

  event.locals.user = user ?? null;

  // 👤 Fetch profile if logged in
  if (user) {
    const { data: profile } = await event.locals.supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    event.locals.profile = profile ?? null;
  } else {
    event.locals.profile = null;
  }

  // Continue to resolve request
  return resolve(event);
};

import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

export const user = writable(null);
export const profile = writable(null);

async function loadProfile() {
  const { data: { user: authUser } } = await supabase.auth.getUser();
  user.set(authUser);

  if (authUser) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (!error) {
      profile.set(data);
    } else {
      profile.set(null);
    }
  } else {
    profile.set(null);
  }
}

// initial load
loadProfile();

// listen for auth state changes
supabase.auth.onAuthStateChange(() => {
  loadProfile();
});

export { loadProfile };

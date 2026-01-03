// @ts-nocheck
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
  const { username } = params;
  const viewer = locals.user;

  // -------------------------
  // Fetch public profile
  // -------------------------
  const { data: profile, error: profileError } = await locals.supabase
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
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    return {
      profile: null,
      ventures: [],
      followerCount: 0,
      followingCount: 0,
      isFollowing: false
    };
  }

  // -------------------------
  // Fetch ventures
  // -------------------------
  const { data: ventures } = await locals.supabase
    .from('ventures')
    .select(`
      id,
      name,
      slug,
      about
    `)
    .eq('owner_id', profile.id);

  // -------------------------
  // Follower count
  // -------------------------
  const { count: followerCount } = await locals.supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', profile.id);

  // -------------------------
  // Following count
  // -------------------------
  const { count: followingCount } = await locals.supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', profile.id);

  // -------------------------
  // Is viewer following this user?
  // -------------------------
  let isFollowing = false;

  if (viewer && viewer.id !== profile.id) {
    const { data } = await locals.supabase
      .from('follows')
      .select('follower_id')
      .eq('follower_id', viewer.id)
      .eq('following_id', profile.id)
      .maybeSingle();

    isFollowing = Boolean(data);
  }

  return {
    profile,
    ventures: ventures ?? [],
    followerCount: followerCount ?? 0,
    followingCount: followingCount ?? 0,
    isFollowing
  };
};

export const actions = {
  follow: async ({ locals, request }: import('./$types').RequestEvent) => {
    const user = locals.user;
    if (!user) return fail(401);

    const form = await request.formData();
    const followingId = form.get('following_id') as string;

    if (!followingId) return fail(400);

    const { error } = await locals.supabase
      .from('follows')
      .insert({
        follower_id: user.id,
        following_id: followingId
      });

    if (error) {
      return fail(400, { error: error.message });
    }

    return { success: true };
  },

  unfollow: async ({ locals, request }: import('./$types').RequestEvent) => {
    const user = locals.user;
    if (!user) return fail(401);

    const form = await request.formData();
    const followingId = form.get('following_id') as string;

    if (!followingId) return fail(400);

    const { error } = await locals.supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.id)
      .eq('following_id', followingId);

    if (error) {
      return fail(400, { error: error.message });
    }

    return { success: true };
  }
};
;null as any as Actions;
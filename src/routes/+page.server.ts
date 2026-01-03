// src/routes/+page.server.ts
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
  const q = url.searchParams.get("q")?.trim() ?? "";

  // ------------------------
  // DEFAULT (NO SEARCH)
  // ------------------------
  if (!q) {
    const { data: ventures, error } = await locals.supabase
      .from("ventures")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ventures fetch error:", error.message);
    }

    return {
      ventures: ventures ?? [],
      people: []
    };
  }

  // ------------------------
  // SEARCH MODE
  // ------------------------

  // 🔍 Ventures
  const { data: ventures, error: venturesError } = await locals.supabase
    .from("ventures")
    .select("*")
    .or(
      `name.ilike.%${q}%,about.ilike.%${q}%,type.ilike.%${q}%`
    )
    .limit(24);

  if (venturesError) {
    console.error("Ventures search error:", venturesError.message);
  }

  // 🔍 People
  const { data: people, error: peopleError } = await locals.supabase
    .from("profiles")
    .select(`
      id,
      username,
      first_name,
      last_name,
      state,
      avatar_url,
      collaboration_intent
    `)
    .or(
      `username.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%`
    )
    .limit(6);

  if (peopleError) {
    console.error("People search error:", peopleError.message);
  }

  return {
    ventures: ventures ?? [],
    people: people ?? []
  };
};

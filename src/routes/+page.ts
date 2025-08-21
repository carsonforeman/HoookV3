import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data: ventures, error } = await supabase
    .from("ventures")
    .select("*");

  if (error) {
    console.error("Error fetching ventures:", error);
    return { ventures: [] };
  }

  return { ventures };
}

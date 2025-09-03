import type { SupabaseClient, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      user: User | null; // 🔑 what hooks.server.ts sets
      profile: Record<string, any> | null; // or a proper Profile type if you have one
    }
  }
}

export {};

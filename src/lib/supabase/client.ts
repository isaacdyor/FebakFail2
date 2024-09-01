import { env } from "@/env";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";

export function createClient() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

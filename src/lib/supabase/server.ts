import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import envConfig from "../../config/dotenv";

const supabaseUrl = envConfig.supabaseUrl;
const supabaseAnonKey = envConfig.supabaseKey;
function createClient({
  cookieStore,
  isAdmin = false,
}: {
  cookieStore: ReturnType<typeof cookies>;
  isAdmin?: boolean;
}) {
  return createServerClient(
    supabaseUrl,
    isAdmin ? supabaseAnonKey : supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}

export default createClient;

"use server";
import supabaseServer from "@/lib/supabase/server";
import { Login, NewUser } from "./auth.schema";
import createClient from "@lib/supabase/server";
import { cookies } from "next/headers";

export async function signUp({
  data,
  emailRedirectTo,
}: {
  data: NewUser;
  emailRedirectTo?: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient({ cookieStore });
  const result = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo,
    },
  });
  return { error: result.error?.message, data: result.data.session };
}

export async function signIn(data: Login) {
  const cookieStore = cookies();
  const supabase = createClient({ cookieStore });
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return { error: result.error?.message, data: result.data.session };
}

export const signOut = async () => {
  const cookieStore = cookies();
  const supabase = createClient({ cookieStore });
  const result = await supabase.auth.signOut();
  if (result.error) throw new Error(result.error?.message);
  return null;
};

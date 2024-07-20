"use client";

import { AuthUser, Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase/client";

type AuthContextType = {
  user: AuthUser | null;
  session: Session | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
});

export const useAuth = () => {
  const client = useContext(AuthContext);
  return client;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      switch (_event) {
        case "INITIAL_SESSION":
          supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
          });
          break;
        case "PASSWORD_RECOVERY":
          supabase.auth.signOut();
          setUser(null);
          break;

        case "SIGNED_IN":
          supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
          });
          // Sync the wishlist with local storage
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;

        case "TOKEN_REFRESHED":
          supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
          });
          break;
        case "USER_UPDATED":
          supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
          });
          break;
        case "MFA_CHALLENGE_VERIFIED":
          supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
          });
          break;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
};

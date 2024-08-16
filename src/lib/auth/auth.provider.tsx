"use client";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { JWT, Session, User } from "./auth.model";
import { AuthContext } from "./auth.context";
import { clearCookieSession } from "./auth.service";

export const AuthProvider = ({
  children,
  session: pSession,
}: {
  children: ReactNode;
  session: Session | undefined;
}) => {
  const [storedSession, setSession] = useState<Session | undefined>(pSession);
  const setSessionToken = useCallback(
    (data: Session) => {
      setSession(data);
    },
    [setSession]
  );

  const session = useMemo(
    () =>
      ({
        token: storedSession?.token,
        user: storedSession?.user,
        account: storedSession?.account,
      } as Session),
    [storedSession]
  );
  const signOut = useCallback(async () => {
    setSession(undefined);
    await clearCookieSession();
  }, [setSession]);

  return (
    <AuthContext.Provider
      value={{ session, setSession: setSessionToken, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

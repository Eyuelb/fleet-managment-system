"use server"
import { getCurrentUser } from "@lib/supabase/auth/actions";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const ProtectedLayout = async (props: PropsWithChildren) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/auth/login");
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ProtectedLayout;

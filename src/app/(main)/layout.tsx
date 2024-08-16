import { MainLayout } from "@components/common/layouts/main-layout";
import { ProtectedLayout } from "@lib/auth/auth.guard";
import React, { PropsWithChildren } from "react";
const Layout = (props: PropsWithChildren) => {
  return (
      <ProtectedLayout>
        <MainLayout>{props.children}</MainLayout>
      </ProtectedLayout>
  );
};

export default Layout;

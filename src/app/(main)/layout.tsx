import ProtectedLayout from "@components/auth/protected-layout";
import { MainLayout } from "@components/common/layouts/main-layout";
import React, { PropsWithChildren } from "react";
const Layout = (props: PropsWithChildren) => {
  return (
      <ProtectedLayout>
        <MainLayout>{props.children}</MainLayout>
      </ProtectedLayout>
  );
};

export default Layout;

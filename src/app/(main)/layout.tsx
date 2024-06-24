import { MainLayout } from "@components/common/layouts/main-layout";
import React, { PropsWithChildren } from "react";
const Layout = (props: PropsWithChildren) => {
  return (
      <MainLayout>{props.children}</MainLayout>
  );
};

export default Layout;

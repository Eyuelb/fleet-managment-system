import { Box } from "@mantine/core";
import React, { PropsWithChildren } from "react";
const Layout = (props: PropsWithChildren) => {
  return <Box>
    {props.children}
    </Box>;
};

export default Layout;

'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React,{PropsWithChildren} from 'react';

const AppProgressBar = ({ children }:PropsWithChildren) => {
  return (
    <React.Fragment>
      {children}
      <ProgressBar
        height="4px"
        color="var(--mantine-color-primary-7)"
        options={{ showSpinner: false }}
        shallowRouting
        memo
      />
    </React.Fragment>
  );
};

export default AppProgressBar;
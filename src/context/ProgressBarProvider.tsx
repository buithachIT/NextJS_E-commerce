'use client';

import '@bprogress/core/css';
import { ProgressProvider } from '@bprogress/next/app';
import React from 'react';

function ProgressBarProvider({ children }: React.PropsWithChildren) {
  return (
    <ProgressProvider
      height="3px"
      color="#F4971E"
      options={{ showSpinner: false }}
      disableStyle
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}

export default ProgressBarProvider;

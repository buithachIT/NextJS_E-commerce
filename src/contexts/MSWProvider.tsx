'use client';

import { enableMocking } from '@/config';
import { enableClientMocking } from '@/mocks/enableServerMocking';
import { handlers } from '@/mocks/handlers';
import { Suspense, use, useEffect } from 'react';

const mockingEnabledPromise =
  typeof window !== 'undefined' && enableMocking
    ? import('@/mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: 'bypass',
        });

        worker.use(...handlers);
      })
    : Promise.resolve();

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    enableClientMocking();
  }, []);
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}

'use client';

import { enableMocking } from '@/config';
import { handlers } from '@/mocks/handlers';
import { Suspense, use } from 'react';

const mockingEnabledPromise =
    typeof window !== 'undefined' && enableMocking
        ? import('@/mocks/browser').then(async ({ worker }) => {
            await worker.start({
                onUnhandledRequest(request) {
                    if (request.url.includes('_next')) {
                        return;
                    }
                },
            });

            worker.use(...handlers);
        })
        : Promise.resolve();

export function MSWProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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

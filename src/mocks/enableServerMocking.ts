export async function enableServerMocking() {
  if (
    process.env.NEXT_PUBLIC_ENABLE_MOCK === '1' &&
    typeof window === 'undefined'
  ) {
    const { server } = await import('./server');
    server.listen();
  }
}
export async function enableClientMocking() {
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK === '1' && typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledRequest: "bypass"
    });
  }
}

if (typeof window === 'undefined') {
  // Only run on the server
  import('./server').then(({ server }) => {
    server.listen({
      onUnhandledRequest: 'bypass', // or 'warn' for debugging
    });
  });
}
export {};

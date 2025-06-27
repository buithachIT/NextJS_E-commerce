import { ReactNode } from 'react';

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex flex-col flex-1">{children}</main>
    </>
  );
}

export default PublicLayout;

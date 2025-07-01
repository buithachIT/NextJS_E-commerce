import Footer from '@/components/footer/Footer';
import DefaultHeader from '@/components/header/defaultHeader';
import SignupCTA from '@/components/header/signupCTA';
import { ReactNode } from 'react';

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SignupCTA />
      <DefaultHeader />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </>
  );
}

export default PublicLayout;

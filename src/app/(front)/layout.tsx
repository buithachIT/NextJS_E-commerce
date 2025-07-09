import Footer from '@/components/footers/Footer';
import DefaultHeader from '@/components/headers/defaultHeader';
import SignupCTA from '@/components/headers/signupCTA';
import { ReactNode } from 'react';
import { ApolloWrapper } from '../ApolloWrapper';

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SignupCTA />
      <DefaultHeader />
      <main className="flex flex-col flex-1">
        <ApolloWrapper>{children}</ApolloWrapper>
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;

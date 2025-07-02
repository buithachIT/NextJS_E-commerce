import Footer from '@/components/footers/Footer';
import DefaultHeader from '@/components/header/defaultHeader';
import { Fragment } from 'react';

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <DefaultHeader />
      <div>{children}</div>
      <Footer />
    </Fragment>
  );
};
export default CheckoutLayout;

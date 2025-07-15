import { Fragment } from 'react';

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <div>{children}</div>
    </Fragment>
  );
};
export default CheckoutLayout;

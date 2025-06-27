import { ArrowSm } from '@/components/ui/icons';
import { Label } from '@/components/ui/label';
import BillingForm from '@/features/checkout/components/BillingForm/BillingForm';
import Link from 'next/link';

export default function CountriesPage() {
  return (
    <div className="">
      <Label className="text-sx p-5">
        <Link href="/">Home</Link>{' '}
        <span>
          <ArrowSm />
        </span>{' '}
        <Link href="/checkout">Checkout</Link>
        <ArrowSm />
        Shipping details
      </Label>
      <Label className="text-2xl font-display font-bold p-5">
        Shipping details
      </Label>
      <div className="p-5">
        <BillingForm />
      </div>
      <div></div>
    </div>
  );
}

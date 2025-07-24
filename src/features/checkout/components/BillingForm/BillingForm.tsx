'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { billingFormSchema, BillingFormValues } from './BillingFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  ApplePay,
  GooglePay,
  MasterCard,
  Paypal,
  Visa,
} from '@/components/ui/icons';
import { validateCartFromLocalStorage } from '@/helper/validate';
import toast from 'react-hot-toast';
import { createOrder } from '@/lib/action/order';
import { useState } from 'react';
import { ROUTES } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { decodeDatabaseId } from '@/helper/decoded';
import { loadStripe } from '@stripe/stripe-js';
import PickCountry from '../PickAddress/PickCountry';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const BillingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { user } = useAuth();
  const router = useRouter();
  const { clearCart } = useCart();
  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingFormSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
      detailAddress: '',
      country: '',
      state: '',
      note: '',
    },
  });

  const { setValue } = form;
  const uid = user?.databaseId || decodeDatabaseId(user?.id || '');
  const onSubmit = async (data: BillingFormValues) => {
    const validCart = await validateCartFromLocalStorage();
    if (!validCart) {
      toast.error('Your shopping cart is invalid or has been modified. Please check again.');
      return;
    }
    setIsSubmitting(true);
    try {
      if (paymentMethod === 'stripe') {
        // Gọi API backend tạo checkout session
        const res = await fetch('/api/checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cart: validCart,
            billingInfo: data,
            uid,
          }),
        });
        const { url } = await res.json();
        if (url) {
          await stripePromise;
          // Redirect khách sang Stripe Checkout
          window.location.href = url;
        } else {
          toast.error('Failed to initiate Stripe checkout');
        }
      } else {
        const order = await createOrder(data, validCart, uid);
        if (order) {
          toast.success('Order created successfully!');
          localStorage.removeItem('cart');
          clearCart();
          router.push(ROUTES.HOMEPAGE);
          form.reset();
        } else {
          toast.error('Order creation failed, please try again.');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while processing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="md:mx-auto md:w-full pb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[20px]">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[20px]">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pt-2">
                <FormLabel className="text-[20px]">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="pt-2">
                <FormLabel className="text-[20px]">Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="pt-2">
                <PickCountry
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    setValue('state', '');
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[20px]">State/City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pt-2 text-[20px]">
                  Your Detailed Address
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[20px]">Note:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <hr className="mt-5 pb-2" />
            <p className="font-bold pb-5 text-[20px]">Choose payment method</p>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="cod" id="r1" />
                <Label className="font-bold" htmlFor="r1">
                  COD
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem value="stripe" id="r3" />
                <Label htmlFor="r3">Credit Card (Stripe)</Label>
              </div>

              <div className="flex">
                <Visa />
                <MasterCard />
                <Paypal />
                <ApplePay />
                <GooglePay />
              </div>
            </RadioGroup>
          </div>
          <Button
            className="mt-5 rounded-4xl h-[50px] w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Pay now'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BillingForm;

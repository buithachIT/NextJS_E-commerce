'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import PickCountry from '../pickAddress/pickCountry';
import PickState from '../pickAddress/pickState';
import { billingFormSchema, BillingFormValues } from './BillingFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

const BillingForm = () => {
  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingFormSchema),
    defaultValues: {
      detailAddress: '',
      country: '',
      state: '',
      note: '',
    },
  });
  const {
    watch,
    setValue,
    formState: {},
  } = form;
  const selectedCountry = watch('country');

  const onSubmit = (data: BillingFormValues) => {
    console.log('Billing Info:', data);
  };
  return (
    <div className="md:mx-auto md:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
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

          {selectedCountry && (
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <PickState
                    countryCode={selectedCountry}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="detailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Details address</FormLabel>
                <FormControl>
                  <Input onChange={field.onChange}></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note:</FormLabel>
                <FormControl>
                  <Input onChange={field.onChange}></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Payment
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default BillingForm;

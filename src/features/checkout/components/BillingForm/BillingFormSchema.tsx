import { z } from 'zod';

export const billingFormSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone'),
  country: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  detailAddress: z.string().min(1, 'Required'),
  note: z.string().optional(),
});

export type BillingFormValues = z.infer<typeof billingFormSchema>;

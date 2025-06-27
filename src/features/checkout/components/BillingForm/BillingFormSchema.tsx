import { z } from 'zod';

export const billingFormSchema = z.object({
  detailAddress: z
    .string()
    .min(5, 'Detailed address must be at least 5 characters'),

  country: z.string().min(1, 'Please select country'),

  state: z.string().min(1, 'Please select state'),

  note: z.string().optional(),
});

export type BillingFormValues = z.infer<typeof billingFormSchema>;

import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PHONE_MESSAGE,
  REQUIRED_MESSAGE,
} from '@/consts/validation';
import { z } from 'zod';

export const billingFormSchema = z.object({
  firstName: z.string().min(1, REQUIRED_MESSAGE),
  lastName: z.string().min(1, REQUIRED_MESSAGE),
  email: z.string().email(INVALID_EMAIL_MESSAGE),
  phone: z.string().min(10, INVALID_PHONE_MESSAGE),
  country: z.string().min(1, REQUIRED_MESSAGE),
  state: z.string().min(1, REQUIRED_MESSAGE),
  detailAddress: z.string().min(1, REQUIRED_MESSAGE),
  note: z.string().optional(),
});

export type BillingFormValues = z.infer<typeof billingFormSchema>;

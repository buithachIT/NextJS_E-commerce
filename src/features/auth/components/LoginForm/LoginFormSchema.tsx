import {
  INVALID_EMAIL_MESSAGE,
  REQUIRED_MESSAGE,
  WEAK_PASSWORD_MESSAGE,
} from '@/consts/validation';
import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: REQUIRED_MESSAGE,
    })
    .min(1, { message: REQUIRED_MESSAGE })
    .email({
      message: INVALID_EMAIL_MESSAGE,
    }),
  password: z
    .string({
      required_error: REQUIRED_MESSAGE,
    })
    .min(1, { message: REQUIRED_MESSAGE })
    .min(8, { message: WEAK_PASSWORD_MESSAGE })
    .max(19, { message: WEAK_PASSWORD_MESSAGE })
    .refine((password) => /[A-Z]/.test(password), WEAK_PASSWORD_MESSAGE)
    .refine((password) => /[a-z]/.test(password), WEAK_PASSWORD_MESSAGE)
    .refine((password) => /[0-9]/.test(password), WEAK_PASSWORD_MESSAGE)
    .refine((password) => /[!@#$%^&*]/.test(password), WEAK_PASSWORD_MESSAGE),
  // rememberMe: z.boolean(),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;

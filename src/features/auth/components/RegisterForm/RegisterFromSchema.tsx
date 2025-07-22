import { REQUIRED_MESSAGE, WEAK_PASSWORD_MESSAGE } from '@/consts/validation';
import * as z from 'zod';

export const registerFormSchema = z
  .object({
    username: z.string().min(3, REQUIRED_MESSAGE),
    email: z
      .string({
        required_error: REQUIRED_MESSAGE,
      })
      .min(1, { message: REQUIRED_MESSAGE })
      .email({
        message: REQUIRED_MESSAGE,
      }),
    password: z
      .string({
        required_error: REQUIRED_MESSAGE,
      })
      .min(1, { message: REQUIRED_MESSAGE })
      .min(8, { message: WEAK_PASSWORD_MESSAGE })
      .max(16, { message: WEAK_PASSWORD_MESSAGE })
      .refine((password) => /[A-Z]/.test(password), WEAK_PASSWORD_MESSAGE)
      .refine((password) => /[a-z]/.test(password), WEAK_PASSWORD_MESSAGE)
      .refine((password) => /[0-9]/.test(password), WEAK_PASSWORD_MESSAGE)
      .refine((password) => /[!@#$%^&*]/.test(password), WEAK_PASSWORD_MESSAGE),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

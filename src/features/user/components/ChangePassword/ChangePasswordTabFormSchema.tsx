import { REQUIRED_MESSAGE, WEAK_PASSWORD_MESSAGE } from '@/consts/validation';
import { z } from 'zod';

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: REQUIRED_MESSAGE,
    }),
    newPassword: z
      .string()
      .min(1, {
        message: REQUIRED_MESSAGE,
      })
      .min(8, { message: WEAK_PASSWORD_MESSAGE })
      .max(16, { message: WEAK_PASSWORD_MESSAGE })
      .refine((password) => /[A-Z]/.test(password), WEAK_PASSWORD_MESSAGE)
      .refine((password) => /[a-z]/.test(password), WEAK_PASSWORD_MESSAGE)
      .refine((password) => /[0-9]/.test(password), WEAK_PASSWORD_MESSAGE)
      .refine((password) => /[!@#$%^&*]/.test(password), WEAK_PASSWORD_MESSAGE),
    confirmNewPassword: z.string().min(1, {
      message: REQUIRED_MESSAGE,
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords don’t match. Please try again.',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

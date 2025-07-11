import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Required field',
    })
    .min(1, { message: 'Required field' })
    .email({
      message: 'INVALID_EMAIL',
    }),
  password: z
    .string({
      required_error: 'Required field',
    })
    .min(1, { message: 'Required field' })
    .min(8, { message: 'WEAK_PASSWORD' })
    .max(19, { message: 'WEAK_PASSWORD' })
    .refine((password) => /[A-Z]/.test(password), 'WEAK_PASSWORD')
    .refine((password) => /[a-z]/.test(password), 'WEAK_PASSWORD')
    .refine((password) => /[0-9]/.test(password), 'WEAK_PASSWORD')
    .refine((password) => /[!@#$%^&*]/.test(password), 'WEAK_PASSWORD'),
  // rememberMe: z.boolean(),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;

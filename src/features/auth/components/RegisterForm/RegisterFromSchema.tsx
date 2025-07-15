import * as z from 'zod';

export const registerFormSchema = z
  .object({
    username: z.string().min(3, 'Username is required'),
    email: z
      .string({
        required_error: 'required field',
      })
      .min(1, { message: 'required field' })
      .email({
        message: 'required field',
      }),
    password: z
      .string({
        required_error: 'required field',
      })
      .min(1, { message: 'required field' })
      .min(8, { message: 'weak password' })
      .max(16, { message: 'weak password' })
      .refine((password) => /[A-Z]/.test(password), 'weak password')
      .refine((password) => /[a-z]/.test(password), 'weak password')
      .refine((password) => /[0-9]/.test(password), 'weak password')
      .refine((password) => /[!@#$%^&*]/.test(password), 'weak password'),
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

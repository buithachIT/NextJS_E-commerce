import z from 'zod';

export const updateUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  username: z.string().min(3),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

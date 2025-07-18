import { INVALID_EMAIL_MESSAGE, REQUIRED_MESSAGE } from '@/consts/validation';
import z from 'zod';

export const updateUserSchema = z.object({
  id: z.string().min(1, { message: REQUIRED_MESSAGE }),
  email: z.string().email({ message: INVALID_EMAIL_MESSAGE }),
  username: z.string().min(3),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

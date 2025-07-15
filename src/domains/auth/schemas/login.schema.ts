import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
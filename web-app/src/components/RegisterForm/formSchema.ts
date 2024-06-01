import { z } from 'zod';

export const RegisterValidationSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(6, 'Username must be at least 6 characters length')
      .max(20, 'Username must be at most 20 characters length'),
    password: z
      .string()
      .trim()
      .min(6, 'Password must be at least 6 characters length')
      .max(50, 'Password must be at most 50 characters length'),
    confirmPassword: z.string().trim().min(1, 'Confirm password is required'),
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().trim().email('Not a valid address email').optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Confirm password did not match',
    path: ['confirmPassword'],
  });

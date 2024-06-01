import { z } from 'zod';

export const LoginValidationSchema = z.object({
  username: z
    .string()
    .trim()
    .min(6, 'Username must be at least 6 characters length'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters length'),
});

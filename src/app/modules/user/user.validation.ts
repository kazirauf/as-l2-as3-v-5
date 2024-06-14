import { z } from 'zod';

export const UserRoleSchema = z.enum(['admin', 'user']);

const createUserValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: UserRoleSchema,
    address: z.string(),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    role: UserRoleSchema.optional(),
    address: z.string().optional(),
  }),
});

export const validateUser = { createUserValidation, updateUserValidation };

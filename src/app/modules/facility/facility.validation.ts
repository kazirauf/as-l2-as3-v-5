import { z } from 'zod';

const validateCreateFacility = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
    location: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});

const validateUpdateFacility = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number')
      .optional(),
    location: z.string().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const validateFacility = {
  validateCreateFacility,
  validateUpdateFacility,
};

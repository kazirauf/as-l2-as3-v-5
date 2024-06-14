import { z } from 'zod';

const createBookingValidation = z.object({
  body: z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    facility: z.string(),
  }),
});

export const validateBooking = { createBookingValidation };

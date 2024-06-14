import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth/auth';
import validateRequest from '../../middlewares/validateRequest/validateRequest';
import { validateBooking } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(validateBooking.createBookingValidation),
  BookingControllers.createBooking,
);

router.get('/', auth('admin'), BookingControllers.viewAllBookings);

router.get('/user', auth('user'), BookingControllers.viewAllBookingsByUser);

router.delete('/:id', auth('user'), BookingControllers.cancelBooking);

router.get('/check-availability', BookingControllers.checkAvailability);

export const BookingRoutes = router;

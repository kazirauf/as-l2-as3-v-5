/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse/sendResponse';
import { BookingServices } from './booking.service';

const createBooking: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookingServices.createBooking(req.body, req.user);

    sendResponse(res, result, 'Booking created succesfully');
  } catch (error) {
    next(error);
  }
};

const viewAllBookings: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookingServices.viewAllBookings();

    return res.status(result.length === 0 ? 404 : 200).json({
      success: result.length === 0 ? false : true,
      statusCode: result.length === 0 ? 404 : 200,
      message:
        result.length === 0
          ? 'No Data Found'
          : 'Bookings retrieved succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const viewAllBookingsByUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookingServices.viewAllBookingsByUser(req.user);

    return res.status(result.length === 0 ? 404 : 200).json({
      success: result.length === 0 ? false : true,
      statusCode: result.length === 0 ? 404 : 200,
      message:
        result.length === 0
          ? 'No Data Found'
          : 'Bookings retrieved succesfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
};

const cancelBooking: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookingServices.cancelBooking(req.params.id);

    sendResponse(res, result, 'Booking cancelled succesfully');
  } catch (error) {
    next(error);
  }
};

const checkAvailability: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookingServices.checkavailabilityBookingService(
      req.query.date as string,
    );

    sendResponse(res, result, 'Availability checked successfully');
  } catch (error) {
    next(error);
  }
};

export const BookingControllers = {
  createBooking,
  viewAllBookings,
  viewAllBookingsByUser,
  cancelBooking,
  checkAvailability,
};

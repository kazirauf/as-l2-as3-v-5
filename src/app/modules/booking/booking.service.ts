import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import BookingModel from './booking.model';
import UserModel from '../user/user.model';
import { Types } from 'mongoose';
import FacilityModel from '../facility/facility.model';
import calculatePayable from '../../utils/calculatePayable/calculatePayable';
import moment from 'moment';
import { formatDates, validateDate } from './boooking.utils';



const createBooking = async (payload: TBooking, user: JwtPayload) => {
  const userData = await UserModel.findOne({ email: user.email });
  const facilityDetails = await FacilityModel.findById(payload.facility);

  if (!facilityDetails) {
    throw new Error('Facility not found!');
  }

  const bookings = await BookingModel.find({
    date: payload.date,
  });

  const requestedStartTime = moment(payload.startTime, 'HH:mm');
  const requestedEndTime = moment(payload.endTime, 'HH:mm');

  for (const booking of bookings) {
    const existingStartTime = moment(booking.startTime, 'HH:mm');
    const existingEndTime = moment(booking.endTime, 'HH:mm');

    const isOverlap =
      requestedStartTime.isBefore(existingEndTime) &&
      requestedEndTime.isAfter(existingStartTime);

    if (isOverlap) {
      throw new Error('The requested time slot is already booked!');
    }
  }

  payload.user = userData?._id as Types.ObjectId;
  payload.payableAmount = calculatePayable(
    payload.endTime,
    payload.startTime,
    facilityDetails?.pricePerHour as number,
  );

  const result = await BookingModel.create(payload);
  return result;
};

const viewAllBookings = async () => {
  const result = await BookingModel.find()
    .populate('user')
    .populate('facility');
  return result;
};

const viewAllBookingsByUser = async (user: JwtPayload) => {
  const result = await BookingModel.find()
    .populate({
      path: 'user',
      match: { email: user.email },
    })
    .populate('facility');

  const filteredResult = result.filter((booking) => booking.user);

  return filteredResult;
};

const cancelBooking = async (id: string) => {
  const result = await BookingModel.findOneAndUpdate(
    { _id: id },
    { isBooked: 'cancelled' },
    { new: true, runValidators: true },
  ).populate('facility');

  if (!result) {
    throw new Error('Booking not found!!');
  }

  return result;
};

//   const dateParam = dateFromQuery as string;
//   console.log(dateParam, "date param");
  
//   const date = dateParam
//     ? moment(dateParam, 'DD-MM-YYYY').format('YYYY-MM-DD')
//     : moment().format('YYYY-MM-DD');
// console.log(date, "date");

//   // Fetch all bookings for the specified date, selecting only startTime and endTime
//   const bookings = await BookingModel.find({ date: date }).select(
//     'startTime endTime -_id',
//   );
  
// console.log(bookings, "bookings");

//   // Define the full range of the day's available time slots
//   const fullDayStart = moment('00:00', 'HH:mm');
//   const fullDayEnd = moment('24:00', 'HH:mm');
   
//   // Sort the bookings by startTime
//   const sortedBookings = bookings.sort((a, b) =>
//     moment(a.startTime, 'HH:mm').diff(moment(b.startTime, 'HH:mm')),
//   );
// console.log(sortedBookings, "sortedBookings");

//   // Initialize available slots array
//   const availableSlots = [];

//   // If no bookings for the day, show the full day availability
//   if (sortedBookings.length === 0) {
//     availableSlots.push({
//       startTime: '00:00',
//       endTime: '24:00',
//     });
//     return availableSlots;
//   }

//   // Check time before the first booking
//   if (fullDayStart.isBefore(moment(sortedBookings[0].startTime, 'HH:mm'))) {
//     availableSlots.push({
//       startTime: fullDayStart.format('HH:mm'),
//       endTime: moment(sortedBookings[0].startTime, 'HH:mm').format('HH:mm'),
//     });
//   }

//   // Check gaps between bookings
//   for (let i = 0; i < sortedBookings.length - 1; i++) {
//     const endCurrentBooking = moment(sortedBookings[i].endTime, 'HH:mm');
//     const startNextBooking = moment(sortedBookings[i + 1].startTime, 'HH:mm');

//     if (endCurrentBooking.isBefore(startNextBooking)) {
//       availableSlots.push({
//         startTime: endCurrentBooking.format('HH:mm'),
//         endTime: startNextBooking.format('HH:mm'),
//       });
//     }
//   }

//   // Check time after the last booking
//   if (
//     moment(sortedBookings[sortedBookings.length - 1].endTime, 'HH:mm').isBefore(
//       fullDayEnd,
//     )
//   ) {
//     availableSlots.push({
//       startTime: moment(
//         sortedBookings[sortedBookings.length - 1].endTime,
//         'HH:mm',
//       ).format('HH:mm'),
//       endTime: fullDayEnd.format('HH:mm'),
//     });
//   }

//   return availableSlots;
// };

const checkavailabilityBookingService = async (dateData: string) => {
  const currentDate = new Date();
  const updateDate = formatDates(currentDate);
  const queryDate = dateData ? dateData : updateDate;
  if (!validateDate(queryDate)) {
    throw new Error('Invalid date format. Date must be in YYYY-MM-dd format.');
  }

  const SlotsDate = await BookingModel.find({ date: queryDate });
  const bookedTimeSlots = SlotsDate.map((data) => ({
    startTime: data.startTime,
    endTime: data.endTime,
  }));

 
  let StartTime = '00:00';
  let EndTime = '24:00';

  if (bookedTimeSlots.length === 0) {
    StartTime = '00:00';
    EndTime = '23:59';
  }

  console.log('bookedTimeSlots', bookedTimeSlots);
  let availableSlots: { startTime: string; endTime: string }[] = [
    { startTime: StartTime, endTime: EndTime },
  ];

 
  const timeMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Filter out booked time slots from available time slots
  for (const booking of bookedTimeSlots) {
    availableSlots = availableSlots.reduce(
      (result, slot) => {
        const slotStartMinutes = timeMinutes(slot.startTime);
        const slotEndMinutes = timeMinutes(slot.endTime);
        const bookingStartMinutes = timeMinutes(booking.startTime);
        const bookingEndMinutes = timeMinutes(booking.endTime);
   
        if (
          bookingStartMinutes < slotEndMinutes &&
          bookingEndMinutes > slotStartMinutes
        ) {
          if (slotStartMinutes < bookingStartMinutes) {
            result.push({
              startTime: slot.startTime,
              endTime: booking.startTime,
            });
          }
          if (slotEndMinutes > bookingEndMinutes) {
            result.push({ startTime: booking.endTime, endTime: slot.endTime });
          }
        } else {
          result.push(slot);
        }
        return result;
      },
      [] as { startTime: string; endTime: string }[],
    );
  }

  return availableSlots;
};



export const BookingServices = {
  createBooking,
  viewAllBookings,
  viewAllBookingsByUser,
  cancelBooking,
  checkavailabilityBookingService,
};

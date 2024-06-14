import { isValid, parse } from 'date-fns';
import { TSchedule } from './booking.interface';


export const validateDate = (dateString: string): boolean => {
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate);
};

export const formatDates = (dateTime: Date): string => {
  const date = new Date(dateTime);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const TimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
): boolean => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};

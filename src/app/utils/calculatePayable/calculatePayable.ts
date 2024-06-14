const calculatePayable = (
  endTime: string,
  startTime: string,
  pricePerHour: number,
): number => {
  const today = new Date();

  const startParts = startTime.split(':');
  const endParts = endTime.split(':');

  // Parse the start and end times
  const start = new Date(today);
  start.setHours(parseInt(startParts[0]), parseInt(startParts[1]), 0, 0);

  const end = new Date(today);
  end.setHours(parseInt(endParts[0]), parseInt(endParts[1]), 0, 0);

  // Check if the parsed dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid start time or end time');
  }

  // Calculate the duration in hours
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  // Check if the duration is valid
  if (durationInHours < 0) {
    throw new Error('End time must be bigger than start time');
  }

  // Calculate the payable amount
  const payableAmount = durationInHours * pricePerHour;

  return payableAmount;
};

export default calculatePayable;

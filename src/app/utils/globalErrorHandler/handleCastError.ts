import mongoose from 'mongoose';
import { TGenericErrorResponse, TErrorSources } from './error.interface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessages: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessages,
  };
};

export default handleCastError;

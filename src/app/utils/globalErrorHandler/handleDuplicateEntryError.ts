/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from './error.interface';

const handleDuplicateEntryError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorMessages: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplication Found',
    errorMessages,
  };
};

export default handleDuplicateEntryError;

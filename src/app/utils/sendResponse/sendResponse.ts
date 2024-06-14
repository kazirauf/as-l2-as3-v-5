import { Response } from 'express';

const sendResponse = (res: Response, result: unknown, message: string) => {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: message,
    data: result,
  });
};

export default sendResponse;

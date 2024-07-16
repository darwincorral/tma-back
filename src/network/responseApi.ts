import { Response, Request } from 'express';

// Function to send a successful response
export function successResponse(
  request: Request,
  response: Response,
  status: number = 200,
  totalRecords: number = 0,
  recordCount: number = 0,
  message: string = '',
  data: any = null,
) {
  const successResponse = {
    success: true,
    statusCode: status,
    totalRecords,
    recordCount,
    message,
    data,
  };

  response.status(status).json(successResponse);
}

// Function to send an error response
export function errorResponse(
  request: Request,
  response: Response,
  errorCode: string,
  status: number = 500,
  message: string = 'Internal server error',
  data: any = null,
) {
  const errorResponse = {
    success: false,
    errorCode,
    message,
    data,
  };

  response.status(status).json(errorResponse);
}

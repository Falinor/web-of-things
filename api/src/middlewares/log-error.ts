import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { ErrorWithStatus } from '../errors/index';

export function logError(): ErrorRequestHandler {
  return (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction): any => {
    console.error(err.stack);
    next(err);
  };
}

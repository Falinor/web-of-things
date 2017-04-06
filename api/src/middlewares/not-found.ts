import { NextFunction, Request, RequestHandler, Response } from 'express';

import { ErrorWithStatus } from '../errors/error-with-status';

export function notFound(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): any => {
    const err = new ErrorWithStatus('Not found', 404);
    next(err);
  };
}

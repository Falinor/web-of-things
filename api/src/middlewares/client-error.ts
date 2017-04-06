import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { ErrorWithStatus } from '../errors/index';

export function clientError(): ErrorRequestHandler {
  return (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction): any => {
    res.status(err.status || 500).json({ error: err.message });
  };
}

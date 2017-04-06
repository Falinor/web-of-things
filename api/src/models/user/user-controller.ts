import { NextFunction, Request, Response } from 'express';

import { UserDAO } from './user-model';

export function list(req: Request, res: Response, next: NextFunction) {
  const max = 30;
  return UserDAO.find()
    .limit(max)
    .exec()
    .then((docs) => {
      res.status(200).json({ data: docs });
    })
    .catch((err) => {
      next(err);
    });
}

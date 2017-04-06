import { NextFunction, Request, Response, Router } from 'express';

const indexRoutes: Router = Router();

// Routes
indexRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json('Welcome to REST API');
});

export { indexRoutes };

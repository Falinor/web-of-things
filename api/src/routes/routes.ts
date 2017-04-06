import { Router } from 'express';

import { userRoutes } from './user/index';

const routes: Router = Router();

// Routes
routes.use('/', (req, res, next) => {
  res.status(200).json('Welcome to REST API');
});

routes.use('/users', userRoutes);

export { routes };

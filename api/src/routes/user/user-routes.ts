import { Router } from 'express';

import { findAll } from './user-controller';

const userRoutes: Router = Router();

// Routes
userRoutes.get('/', findAll);

export { userRoutes };

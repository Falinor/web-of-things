import { Router } from 'express';

import { list } from './user-controller';

const userRoutes: Router = Router();

// Routes
userRoutes.get('/', list);

export { userRoutes };

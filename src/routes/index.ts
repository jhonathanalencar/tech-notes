import { Router } from 'express';

import { noteRoutes } from './note.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

export { router };

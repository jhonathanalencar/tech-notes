import { Router } from 'express';
import { loginController } from '../modules/auth/useCases/login';

const authRoutes = Router();

authRoutes.post('/', (request, response) =>
  loginController.handle(request, response)
);

export { authRoutes };

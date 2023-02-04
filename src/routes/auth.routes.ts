import { Router } from 'express';

import { loginController } from '../modules/auth/useCases/login';
import { logoutController } from '../modules/auth/useCases/logout';
import { refreshController } from '../modules/auth/useCases/refresh';

const authRoutes = Router();

authRoutes.post('/', (request, response) =>
  loginController.handle(request, response)
);

authRoutes.get('/refresh', (request, response) =>
  refreshController.handle(request, response)
);

authRoutes.post('/logout', (request, response) =>
  logoutController.handle(request, response)
);

export { authRoutes };

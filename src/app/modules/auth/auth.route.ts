import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest/validateRequest';
import { AuthValidation } from './auth.validation';
import { UserControllers } from '../user/user.controller';
import { validateUser } from '../user/user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(validateUser.createUserValidation),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;

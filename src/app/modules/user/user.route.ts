import express from 'express';
import validateRequest from '../../middlewares/validateRequest/validateRequest';
import { validateUser } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(validateUser.createUserValidation),
  UserControllers.createUser,
);

export const UserRoutes = router;

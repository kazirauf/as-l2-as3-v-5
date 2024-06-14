import { TUser } from './user.interface';
import UserModel from './user.model';

const createUser = async (payload: TUser) => {
  const result = await UserModel.create(payload);

  // Create a new object without the password field
  const sanitizedUser = {
    ...result.toObject(),
    password: undefined,
  };

  return sanitizedUser;
};

export const UserServices = {
  createUser,
};

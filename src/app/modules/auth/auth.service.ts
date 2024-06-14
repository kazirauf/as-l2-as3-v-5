import UserModel from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

const login = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User not found !');
  }

  //checking if the password is correct

  const matchPassword = await bcrypt.compare(
    payload.password,
    user.password as string,
  );

  if (!matchPassword) {
    throw new Error('Wrong Password !');
  }

  //create token and send to the  client

  const jwtPayload: JwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_acess_token_secret as string,
    config.access_token_expires_in as string,
  );

  const userData = await UserModel.findOne({ email: payload.email });

  return {
    accessToken,
    userData,
  };
};

export const AuthServices = {
  login,
};

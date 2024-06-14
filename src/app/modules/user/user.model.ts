import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema: Schema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: 0 },
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
  address: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

const UserModel = mongoose.model<TUser>('User', userSchema);

export default UserModel;

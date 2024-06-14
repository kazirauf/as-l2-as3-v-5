type UserRole = 'admin' | 'user';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  address: string;
};

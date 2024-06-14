import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.SALT_ROUND,
  jwt_acess_token_secret: process.env.JWT_ACESS_TOKEN_SECRET,
  access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
};

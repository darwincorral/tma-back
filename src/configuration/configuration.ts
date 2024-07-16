import { registerAs } from '@nestjs/config';

export default registerAs('dao', () => ({
  host: process.env.host,
  user: process.env.user,
  schema: process.env.schema,
  PORT: process.env.PORT,

}));

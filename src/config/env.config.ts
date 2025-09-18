export const EnvConfiguration = () => ({
  NODE_ENV: process.env.NODE_ENV || 'dev',
  // server
  PORT: process.env.PORT || 3002,
  HOST_API: process.env.HOST_API,
  DEFAULT_LIMIT: process.env.DEFAULT_LIMIT ? +process.env.DEFAULT_LIMIT : 5,
  LOG_HTTP_REQUEST: process.env.LOG_HTTP_REQUEST,
  // postgres
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  // auth
  JWT_SECRET: process.env.JWT_SECRET,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config = EnvConfiguration();

export type EnvConfig = typeof config;

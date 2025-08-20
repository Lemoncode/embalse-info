export const CONFIG = {
  PORT: Number(process.env.PORT ?? 3000),
  TIMEOUT_MS: Number(process.env.TIMEOUT_MS ?? 15000),
  RETRIES: Number(process.env.RETRIES ?? 2),
};

import * as dotenv from "dotenv";

export const getEnv = () => {
  const env = process.env.ENV || "dev";

  dotenv.config({
    override: true,
    path: `support/env/.env.${env}`,
  });
};

import "dotenv/config";
import * as env from "env-var";

const envs = {

    //% SERVER CONFIG:
    DEV_MODE: env.get("DEV_MODE").asBool() || true,
    PORT: env.get("PORT").asPortNumber(),

    //% JWT CONFIG:
    USER_ACCESS_TOKEN_SECRET: env.get("USER_ACCESS_TOKEN_SECRET").required().asString(),
    USER_ACCESS_TOKEN_EXPIRATION: env.get("USER_ACCESS_TOKEN_EXPIRATION").required().asString(),
    USER_REFRESH_TOKEN_SECRET: env.get("USER_REFRESH_TOKEN_SECRET").required().asString(),
    USER_REFRESH_TOKEN_EXPIRATION: env.get("USER_REFRESH_TOKEN_EXPIRATION").required().asString(),
    USER_RECOVERY_TOKEN_SECRET: env.get("USER_RECOVERY_TOKEN_SECRET").required().asString(),
    USER_RECOVERY_TOKEN_EXPIRATION: env.get("USER_RECOVERY_TOKEN_EXPIRATION").required().asString(),

    // //% RESEND:
    RESEND_API_KEY: env.get("RESEND_API_KEY").required().asString(),
    RESEND_DOMAIN_EMAIL: env.get("RESEND_DOMAIN_EMAIL").required().asString(),

    //% TELEMETRY:
    TELEMETRY_API_KEY: env.get("TELEMETRY_API_KEY").required().asString(),
    TELEMETRY_URL: env.get("TELEMETRY_URL").required().asString(),

    //% DB:
    DB_HOST: env.get("DB_HOST").required().asString(),
    DB_PORT: env.get("DB_PORT").required().asPortNumber(),
    DB_USERNAME: env.get("DB_USERNAME").required().asString(),
    DB_PASSWORD: env.get("DB_PASSWORD").required().asString(),
    DB_NAME: env.get("DB_NAME").required().asString(),

    //% REDIS:
    REDIS_URL: env.get("REDIS_URL").required().asString(),
};


export default envs;
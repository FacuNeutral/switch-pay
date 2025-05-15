import "dotenv/config";
import * as env from "env-var";

const envs = {
  
    //% JWT CONFIG:
    INITIAL_USER_TOKEN_SECRET: env.get("INITIAL_USER_TOKEN_SECRET").required().asString(),
    INITIAL_USER_TOKEN_EXPIRATION: env.get("INITIAL_USER_TOKEN_EXPIRATION").required().asString(),
    USER_TOKEN_SECRET: env.get("USER_TOKEN_SECRET").required().asString(),
    USER_TOKEN_EXPIRATION: env.get("USER_TOKEN_EXPIRATION").required().asString(),

    // //% RESEND:
    // API_KEY_RESEND: env.get("API_KEY_RESEND").required().asString(),
    // EMAIL: env.get("EMAIL").required().asString(),
    // URL_RESEND: env.get("URL_RESEND").required().asString(),
    // //% MYSQL DB:
    // DB_USER: env.get("DB_USER").asString(),
    // DB_PASSWORD: env.get("DB_PASSWORD").asString(),
    // DB_HOST: env.get("DB_HOST").asString(),
    // DB_NAME: env.get("DB_NAME").asString(),
    // DB_PORT: env.get("DB_PORT").asPortNumber(),

    // DEV_MODE: env.get("DEV_MODE").required().asBool(),
    // DEV_DB_USER: env.get("DEV_DB_USER").asString(),
    // DEV_DB_PASSWORD: env.get("DEV_DB_PASSWORD").asString(),
    // DEV_DB_HOST: env.get("DEV_DB_HOST").asString(),
    // DEV_DB_NAME: env.get("DEV_DB_NAME").asString(),
    // DEV_DB_PORT: env.get("DEV_DB_PORT").asPortNumber(),

    // //% TOKEN:
    // API_USER_TOKEN_KEY: env.get("API_USER_TOKEN_KEY").required().asString(),
    // API_CODE_TOKEN_KEY: env.get("API_USER_TOKEN_KEY").required().asString(),
    // API_ADMIN_TOKEN_KEY: env.get("API_ADMIN_TOKEN_KEY").required().asString(),
    // API_RECOVERY_TOKEN_KEY: env.get("API_RECOVERY_TOKEN_KEY").required().asString(),
    // //% CRYPTO:
    // API_ENCRYPTED_KEY: env.get("API_ENCRYPTED_KEY").asString(),
    // SEED_ACTIVE: env.get("SEED_ACTIVE").asBool(),

    // // WASSENGER_TOKEN : env.get("WASSENGER_TOKEN").asString(),
    // //% WEBSITE
    // URL_WEBSITE: env.get("URL_WEBSITE").asUrlString(),
};


export default envs;
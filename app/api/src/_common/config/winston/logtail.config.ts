import envs from "@config/envs/env-var.plugin";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";

// Client for send logs to Telemetry_
export const logtail = new Logtail(envs.TELEMETRY_API_KEY, {
    endpoint: envs.TELEMETRY_URL,
});

export const telemetryTransport = () => envs.PROD_MODE ? [new LogtailTransport(logtail)] : [];
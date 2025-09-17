import 'winston-daily-rotate-file';

import { createLogger, format } from 'winston';

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

import envs from '../envs/env-var.plugin';
import { fileTransport } from './helpers/file-transport';
import { ignoreNestLogs, printFormattedLog } from './helpers/log-format';
import { LogData, LogFileName, LoggerConfig } from './interfaces/logger.interface';


// Client for send logs to Telemetry_
const logtail = new Logtail(envs.TELEMETRY_API_KEY, {
    endpoint: envs.TELEMETRY_URL,
});

export const winstonConfig = {
    loggerInfo: createLogger({
        level: 'info',

        format: format.combine(
            format.timestamp(),
            ignoreNestLogs(),
            format.printf((log: LoggerConfig) => {
                printFormattedLog(log);

                return JSON.stringify(log);
            })
        ),
        transports: [
            fileTransport(LogFileName.ALL),
            fileTransport(LogFileName.INFO),
            new LogtailTransport(logtail),
        ],
    }),

    loggerVerbose: createLogger({
        level: 'verbose',
        format: format.combine(
            format.timestamp(),
            ignoreNestLogs(),
            format.printf((log: LoggerConfig) => {
                printFormattedLog(log);

                return JSON.stringify(log);
            })
        ),
        transports: [
            fileTransport(LogFileName.ALL),
            fileTransport(LogFileName.VERBOSE),
        ],
    }),

    loggerError: createLogger({
        level: 'error',
        format: format.combine(
            format.timestamp(),
            ignoreNestLogs(),
            format.printf((log: LogData) => {
                printFormattedLog(log);

                return JSON.stringify(log);
            })
        ),
        transports: [
            fileTransport(LogFileName.ALL),
            fileTransport(LogFileName.ERROR),
            new LogtailTransport(logtail),
        ],
    }),

    loggerWarn: createLogger({
        level: 'warn',
        format: format.combine(
            format.timestamp(),
            ignoreNestLogs(),
            format.printf((log: LoggerConfig) => {
                printFormattedLog(log);

                return JSON.stringify(log);
            })
        ),
        transports: [
            fileTransport(LogFileName.ALL),
            fileTransport(LogFileName.WARN),
            new LogtailTransport(logtail),
        ],
    }),

    loggerDebug: createLogger({
        level: 'debug',
        format: format.combine(
            format.timestamp(),
            ignoreNestLogs(),
            format.printf((log: LoggerConfig) => {
                printFormattedLog(log);

                return JSON.stringify(log);
            })
        ),
        transports: [
            fileTransport(LogFileName.ALL),
            fileTransport(LogFileName.DEBUG),
        ],
    }),
};

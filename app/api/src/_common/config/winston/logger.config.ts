import 'winston-daily-rotate-file';

import { createLogger, format } from 'winston';

import { fileTransport } from './helpers/flie-transport';
import { ignoreNestLogs, printFormattedLog } from './helpers/log-format';
import { LogData, LogFileName, LoggerConfig } from './interfaces/logger.interface';
import { telemetryTransport } from './logtail.config';

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
            ...telemetryTransport(),
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
            ...telemetryTransport(),
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
            ...telemetryTransport(),
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

import 'winston-daily-rotate-file';

import { createLogger, format, transports } from 'winston';

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

import { ignoreNestLogs, metadataFormat, printFormattedLog } from './helpers/log-format';
import { LogData, LoggerConfig } from './interfaces/logger.interface';
import envs from '../envs/env-var.plugin';


// Client for send logs to Telemetry
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
            new transports.DailyRotateFile({
                filename: 'log/all/all-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),

            new transports.DailyRotateFile({
                filename: 'log/info/info-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),
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
            new transports.DailyRotateFile({
                filename: 'log/all/all-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),

            new transports.DailyRotateFile({
                filename: 'log/verbose/verbose-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),
        ],
    }),

    loggerError: createLogger({
        level: 'error',
        format: format.combine(
            format.timestamp(),
            ignoreNestLogs(),
            format.printf((log: LogData) => {
                printFormattedLog(log);

                console.log("metadata log", log.metadata);
                return JSON.stringify(log);
            })
        ),
        transports: [
            new transports.DailyRotateFile({
                filename: 'log/all/all-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),

            new transports.DailyRotateFile({
                filename: 'log/error/error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),
            new LogtailTransport(logtail),
        ],
    }),

    loggerWarn: createLogger({
        level: 'warn',
        format: format.combine(
            format.timestamp(),
            // Formato personalizado para unir meta con el log
            format.printf((log: LoggerConfig) => {
                // Print log on console
                printFormattedLog(log);

                // Prepare log for transport
                const metadata = metadataFormat(log.metadata);
                const headers = log.headers || {};
                const message = log.message || 'No message';

                return JSON.stringify({
                    message,
                    ...metadata,
                    ...headers
                });
            })
        ),
        transports: [
            new transports.DailyRotateFile({
                filename: 'log/all/all-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),

            new transports.DailyRotateFile({
                filename: 'log/warn/warn-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),
        ],
    }),

    loggerDebug: createLogger({
        level: 'debug',
        format: format.combine(
            format.timestamp(),
            // Formato personalizado para unir meta con el log
            format.printf((log: LoggerConfig) => {
                // Print log on console
                printFormattedLog(log);

                // Prepare log for transport
                const metadata = metadataFormat(log.metadata);
                const headers = log.headers || {};
                const message = log.message || 'No message';

                return JSON.stringify({
                    message,
                    ...metadata,
                    ...headers
                });
            })
        ),
        transports: [
            new transports.DailyRotateFile({
                filename: 'log/all/all-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            }),

            new transports.DailyRotateFile({
                filename: 'log/debug/debug-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '7d',
            })
        ],
    }),
};

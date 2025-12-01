import { RequestMethod } from '@nestjs/common';
import { TransformableInfo } from 'logform';
import { agent } from 'supertest';

export interface LoggerConfig extends TransformableInfo {
    timestamp: string;
    context?: string[] | string;
    message: string;
    metadata?: Record<string, any>;
}

export interface LogData extends TransformableInfo {

    context?: string[] | string;
    message: string;
    userId?: string;
    sessionId?: string;
    requestId?: string;
    metadata?: Record<string, any>;
    device?: {
        userAgent?: string;
        platform?: string;
    };
    request?: {
        method: string,
        path: string,
        clientIp?: string;
    };
}

export interface ErrorLogData extends LogData {
    error: {
        name: string;
        message: string;
        stack?: string;
    }
}

export interface LoggerInstances {
    loggerInfo: Logger;
    loggerError: Logger;
    loggerWarn: Logger;
    loggerAll: Logger;
}


export enum LogFileName {
    ALL = 'log/all/all-%DATE%.log',
    INFO = 'log/info/info-%DATE%.log',
    VERBOSE = 'log/verbose/verbose-%DATE%.log',
    ERROR = 'log/error/error-%DATE%.log',
    WARN = 'log/warn/warn-%DATE%.log',
    DEBUG = 'log/debug/debug-%DATE%.log',
}

export enum LogDatePattern {
    DEFAULT = 'YYYY-MM-DD',
}

export enum LogMaxFiles {
    DEFAULT = '7d',
}
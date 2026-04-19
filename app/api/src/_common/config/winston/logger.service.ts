// src/common/logger/logger.service.ts
import { Inject, Injectable, Scope } from '@nestjs/common';
import { asyncLocalStorage } from '@middlewares/request-context.middleware';
import { INQUIRER } from '@nestjs/core';
import LoggerManager from './logger-manager';
import { ErrorLogData } from './interfaces/logger.interface';


@Injectable({ scope: Scope.TRANSIENT })
export class Logger {
    private readonly context?: string;
    private readonly loggerManager: LoggerManager;

    constructor(@Inject(INQUIRER) parent?: object | string) {
        if (typeof parent === 'string') this.context = parent;
        else this.context = parent?.constructor?.name;
        this.loggerManager = new LoggerManager();
    }

    log(message: string, metadata?: Record<string, any>) {
        const defaultMetadata = this.fetchDefaultMetadata();
        const context = this.context;

        this.loggerManager.info({ level: "info", message, context, metadata, ...defaultMetadata });
    }

    verbose(message: string, metadata?: Record<string, any>) {
        const defaultMetadata = this.fetchDefaultMetadata();
        const context = this.context;

        this.loggerManager.verbose({ level: "verbose", message, context, metadata, ...defaultMetadata });
    }

    error(e: any, message?: string, metadata?: Record<string, any>) {
        const defaultMetadata = this.fetchDefaultMetadata();
        const context = this.context;
        const error: ErrorLogData["error"] = {
            message: e.message,
            name: e.name,
            stack: e.stack,
        }

        this.loggerManager.error({ level: "error", message: message || e.message, context, metadata, ...defaultMetadata, error });
    }

    warn(message: string, metadata?: Record<string, any>) {
        const defaultMetadata = this.fetchDefaultMetadata();
        const context = this.context;

        this.loggerManager.warn({ level: "warn", message, context, metadata, ...defaultMetadata });
    }

    debug(message: string, metadata?: Record<string, any>) {
        const defaultMetadata = this.fetchDefaultMetadata();
        const context = this.context;

        this.loggerManager.debug({ level: "debug", message, context, metadata, ...defaultMetadata });
    }

    private fetchDefaultMetadata() {
        const { id: userId, sessionId } = this.getActiveUserHeaders() || {};
        const activeRequest = this.getActiveRequest();
        const requestId = activeRequest?.id;
        const request = {
            method: activeRequest?.method,
            path: activeRequest?.path,
            clientIp: activeRequest?.ip,
        }
        const device = this.getUserDevice();

        return { userId, sessionId, requestId, request, device };

    }

    private getUserDevice() {
        const device = asyncLocalStorage.getStore()?.get('device');
        if (!device) return undefined;
        return device;
    }

    private getActiveRequest(): { id: string; method: string; path: string; ip?: string } {
        const request = asyncLocalStorage.getStore()?.get('request');
        return request;
    }

    private getActiveUserHeaders(): { id: string, sessionId: string } | undefined {
        const userHeaders = asyncLocalStorage.getStore()?.get('user');
        if (!userHeaders) return undefined;
        return userHeaders;
    }
}

export default Logger;
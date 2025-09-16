// // src/common/logger/logger.service.ts
// import { Inject, Injectable, Scope } from '@nestjs/common';
// import { asyncLocalStorage } from '@middlewares/request-context.middleware';
// import { INQUIRER } from '@nestjs/core';
// import LoggerManager from './logger-manager';
// import { LogData } from './interfaces/logger.interface';


// @Injectable({ scope: Scope.TRANSIENT })
// export class Logger {
//     private readonly context?: string;
//     private readonly loggerManager: LoggerManager;

//     constructor(@Inject(INQUIRER) parent?: object | string) {
//         if (typeof parent === 'string') this.context = parent;
//         else this.context = parent?.constructor?.name;
//         this.loggerManager = new LoggerManager();
//     }

//     log(message: string, metadata?: Record<string, any>) {
//         const defaultMetadata = this.getDefaultMetadata();
//         const context = this.context;

//         this.loggerManager.info({ ...defaultMetadata, message, context, metadata });
//     }

//     verbose(message: string, metadata?: Record<string, any>) {
//         const defaultMetadata = this.getDefaultMetadata();
//         const context = this.context;

//         this.loggerManager.verbose({ ...defaultMetadata, message, context, metadata });
//     }

//     error(message: string, metadata?: Record<string, any>, context?: string) {
//         // const headers = this.getActiveUserHeaders();
//         // this.loggerManager.error({ message, context: this.context, metadata, headers });
//     }

//     warn(message: string, metadata?: Record<string, any>) {
//         const headers = this.getActiveUserHeaders();
//         this.loggerManager.warn({ message, context: this.context, metadata, headers });
//     }

//     debug(message: string, metadata?: Record<string, any>) {
//         const headers = this.getActiveUserHeaders();
//         this.loggerManager.debug({ message, context: this.context, metadata, headers });
//     }

//     private getDefaultMetadata() {
//         const { id: userId, sessionId } = this.getActiveUserHeaders() || {};
//         const { id: requestId, ...request } = this.getActiveRequest();
//         const device = this.getUserDevice();

//         return { userId, sessionId, requestId, request, device };

//     }

//     private getUserDevice() {
//         const device = asyncLocalStorage.getStore()?.get('device');
//         if (!device) return undefined;
//         return device;
//     }

//     private getActiveRequest(): { id: string; method: string; path: string; ip?: string } {
//         const request = asyncLocalStorage.getStore()?.get('request');
//         return request;
//     }

//     private getActiveUserHeaders(): { id: string, sessionId: string } | undefined {
//         const userHeaders = asyncLocalStorage.getStore()?.get('user');
//         if (!userHeaders) return undefined;
//         return userHeaders;
//     }
// }


// export default Logger;
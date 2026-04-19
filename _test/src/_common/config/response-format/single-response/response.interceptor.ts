// response.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_METADATA } from './response-message.decorator';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    constructor(private reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // const ctx = context.switchToHttp();
        // const response = ctx.getResponse();
        // const request = ctx.getRequest();

        const message =
            this.reflector.get<string>(
                RESPONSE_MESSAGE_METADATA,
                context.getHandler(),
            ) || "success";

        return next.handle().pipe(
            map((data) => ({
                data : data? data : null,
                message
                // statusCode: response.statusCode,
                // timestamp: new Date().toISOString(),
            })),
        );
    }
}

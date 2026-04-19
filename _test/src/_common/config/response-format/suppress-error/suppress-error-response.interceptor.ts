// suppress-error-response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { SUPPRESS_ERROR_RESPONSE_KEY } from './suppress-error-response.decorator';

@Injectable()
export class SuppressErrorResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const suppress = this.reflector.getAllAndOverride<boolean>(
      SUPPRESS_ERROR_RESPONSE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!suppress) return next.handle();

    return next.handle().pipe(
      catchError(() => {
        // ⚠️ No se lanza error, ni se devuelve respuesta
        return EMPTY; // Resuelve el observable sin hacer nada
      }),
    );
  }
}

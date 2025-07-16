
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { yellow, red } from 'colorette';  // Importar solo la función 'yellow' de colorette


@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
 
        const className = context.getClass().name;
        const methodName = context.getHandler().name;

   
        this.logger.error(
          `${yellow(`[${className}] [${methodName}]`)} ${red(error.message)}`,
        );

        return throwError(() => error);
      }),
    );
  }
}

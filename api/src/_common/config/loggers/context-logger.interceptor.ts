import { asyncLocalStorage } from '@middlewares/request-context.middleware';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const store = asyncLocalStorage.getStore();
    if (store && req.user) {
      store.set('user', req.user);
    }

    return next.handle();
  }
}

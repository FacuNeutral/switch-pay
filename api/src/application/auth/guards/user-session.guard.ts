import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserSessionGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {

        //* gets the request
        const request = context.switchToHttp().getRequest();

        return request.isAuthenticated();
    }
}
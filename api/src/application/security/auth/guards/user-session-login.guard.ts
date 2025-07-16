import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserSessionLoginGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {

        //* calls my defined LocalStrategy, here my credentials are validated
        const result = (await super.canActivate(context)) as boolean;
        //* get the request
        const request = context.switchToHttp().getRequest();

        //* saves the user in the session
        await super.logIn(request);

        return result;
    }
} 

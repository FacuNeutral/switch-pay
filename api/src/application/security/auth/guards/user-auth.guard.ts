
import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '@db/dtos/user.dto';
import { AuthService } from '../auth.service';

export class RefreshTokenAuthGuard extends AuthGuard(["REFRESH_TOKEN_STRATEGY"]) { }
export class AccessTokenAuthGuard extends AuthGuard(["ACCESS_TOKEN_STRATEGY"]) { }

export class InitialUserAuthGuard extends AuthGuard(["REFRESH_TOKEN_STRATEGY"]) {
    async canActivate(context: any) {
        // Check the authentication from strategy.
        const can = await super.canActivate(context);
        if (!can) return false;

        const request = context.switchToHttp().getRequest();
        const payload = request.user as UserDto;

        if (payload.registerStep === "complete")
            throw new UnauthorizedException("You have already completed your profile");

        return true;

    }
}

@Injectable()
export class UserAuthGuard extends AuthGuard(["ACCESS_TOKEN_STRATEGY"]) {
    // Injects AuthService to use obtainUserRegisterStep method

    constructor(private readonly authService: AuthService) {
        super();
    }

    async canActivate(context: any) {
        // Check the authentication from strategy.
        const can = await super.canActivate(context);
        if (!can) return false;

        const request = context.switchToHttp().getRequest();
        const payload = request.user as UserDto;

        const registerStep = await this.authService.obtainUserRegisterStep(payload.id);

        if (registerStep === "complete") {
            request.user = payload; // Attach the user to the request
            return true;
        }

        throw new UnauthorizedException("You have not completed your profile yet");

    }
}

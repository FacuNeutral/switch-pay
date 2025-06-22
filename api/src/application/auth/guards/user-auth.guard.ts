
import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/_common/database/dtos/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard(["refresh_token_strategy"]) { }
export class AccessTokenAuthGuard extends AuthGuard(["access_token_strategy"]) { }

export class InitialUserAuthGuard extends AuthGuard(["refresh_token_strategy"]) {
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

export class UserAuthGuard extends AuthGuard(["access_token_strategy"]) {
    //trae el servicio  de auth.service.ts obtainUserRegisterStep

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

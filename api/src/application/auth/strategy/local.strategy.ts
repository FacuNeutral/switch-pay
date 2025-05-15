import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            //* overwriting the username and password fields, only need a pinCode
            usernameField: 'pinCode',
            passwordField: 'pinCode',
            passReqToCallback: true,
        });
    }

    async validate(req: any, pinCode: string): Promise<any> {

        //* It is provided from my user token
        const userId = req.user.id;
        const user = await this.authService.checkUserPinCode(userId, pinCode);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

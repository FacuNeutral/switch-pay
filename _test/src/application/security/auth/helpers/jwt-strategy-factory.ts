
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

type TokenName = "access_token" | "refresh_token";
type ExtractTokenBy = "cookies" | "bearer" | "all";

/**
 * Factory function to create a JWT strategy for Passport.js.
 * 
 * @param name - The name of the strategy.
 * @param tokenName - The type of token ( like a access_token or refresh_token), which is also the exact cookie name.
 * @param secretOrKey - The secret key used to verify the JWT.
 * @param extractTokenBy - How to extract the token from the request, can be "cookies", "bearer", or leave empty to tried with all methods.
 */
const JwtStrategyFactory = (
    name: string,
    tokenName: string,
    secretOrKey: string,
    extractTokenBy: ExtractTokenBy = "all"
) => {

    return class extends PassportStrategy(Strategy, `${name}`) {

        constructor() {
            super({
                jwtFromRequest: extractToken(extractTokenBy, tokenName),
                ignoreExpiration: false,
                secretOrKey,
            });
        }
        async validate(payload: any) {
            if (!payload) throw new UnauthorizedException('Invalid token');
            return payload;
        }

    }
}

const extractToken = (extractTokenBy: ExtractTokenBy, tokenName: string) => {

    let tokenExtractors: any;

    switch (extractTokenBy) {
        case "cookies":
            tokenExtractors = ExtractJwt.fromExtractors([extractTokenByCookies(tokenName)]);
            break;
        case "bearer":
            tokenExtractors = ExtractJwt.fromAuthHeaderAsBearerToken();
            break;
        default:
            tokenExtractors = ExtractJwt.fromExtractors([extractTokenByCookies(tokenName), extractTokenByBearerToken()]);
    }
    return tokenExtractors;
}

const extractTokenByCookies = (cookieName: string) =>
    (req: Request) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies[cookieName];
        }
        return token;
    };

const extractTokenByBearerToken = () => ExtractJwt.fromAuthHeaderAsBearerToken();

export default JwtStrategyFactory;
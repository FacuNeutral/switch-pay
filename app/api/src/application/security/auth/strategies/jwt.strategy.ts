import { Injectable, UnauthorizedException } from '@nestjs/common';
import envs from '@envs';

import JwtStrategyFactory from '@auth/helpers/jwt-strategy-factory';
import { BlacklistService } from 'src/shared/blacklist/blacklist.service';

@Injectable()
export class RefreshTokenStrategy extends JwtStrategyFactory(
    'REFRESH_TOKEN_STRATEGY',
    'refreshToken',
    envs.USER_REFRESH_TOKEN_SECRET,
) {
    constructor(private readonly blacklistService: BlacklistService) {
        super();
    }

    async validate(payload: any) {
        const isTokenRevoked = await this.blacklistService.isTokenRevoked(payload.tokenId);
        if (isTokenRevoked) throw new UnauthorizedException('token invalid');

        return payload;
    }
}

@Injectable()
export class AccessTokenStrategy extends JwtStrategyFactory(
    'ACCESS_TOKEN_STRATEGY',
    'accessToken',
    envs.USER_ACCESS_TOKEN_SECRET,
) {

    constructor(private readonly blacklistService: BlacklistService) {
        super();
    }

    async validate(payload: any) {
        const isTokenRevoked = await this.blacklistService.isTokenRevoked(payload.tokenId);
        if (isTokenRevoked) throw new UnauthorizedException('token invalid');

        return payload;
    }
}

@Injectable()
export class RecoveryTokenStrategy extends JwtStrategyFactory(
    'RECOVERY_TOKEN_STRATEGY',
    'recoveryToken',
    envs.USER_RECOVERY_TOKEN_SECRET,
    'bearer'
) {

    constructor(private readonly blacklistService: BlacklistService) {
        super();
    }

    async validate(payload: any) {
        const isTokenRevoked = await this.blacklistService.isTokenRevoked(payload.tokenId);
        if (isTokenRevoked) throw new UnauthorizedException('token invalid');

        return payload;
    }
}

export const JwtStrategies = [RefreshTokenStrategy, AccessTokenStrategy, RecoveryTokenStrategy];

import { Injectable } from '@nestjs/common';
import envs from 'src/_common/config/envs/env-var.plugin';
import JwtStrategyFactory from '../helpers/jwt-strategy-factory';

@Injectable()
export class RefreshTokenStrategy extends JwtStrategyFactory(
    'REFRESH_TOKEN_STRATEGY',
    'refreshToken',
    envs.USER_REFRESH_TOKEN_SECRET,
) {
    // async validate(payload: any) {
    //     return payload;
    // }
}

@Injectable()
export class AccessTokenStrategy extends JwtStrategyFactory(
    'ACCESS_TOKEN_STRATEGY',
    'accessToken',
    envs.USER_ACCESS_TOKEN_SECRET,
) {
    async validate(payload: any) {
        // console.log('Access Token Payload:', payload);
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
    async validate(payload: any) {
        return payload;
    }
}

export const JwtStrategies = [RefreshTokenStrategy, AccessTokenStrategy, RecoveryTokenStrategy];

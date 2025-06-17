import { Injectable } from '@nestjs/common';
import envs from 'src/_common/config/envs/env-var.plugin';
import JwtStrategyFactory from '../helpers/jwt-strategy-factory';

@Injectable()
export class RefreshTokenStrategy extends JwtStrategyFactory(
    'refresh_token_strategy',
    'refresh_token',
    envs.USER_REFRESH_TOKEN_SECRET,
) {
    async validate(payload: any) {
        return payload;
    }
}

@Injectable()
export class AccessTokenStrategy extends JwtStrategyFactory(
    'access_token_strategy',
    'access_token',
    envs.USER_ACCESS_TOKEN_SECRET,
) {
    async validate(payload: any) {
        console.log('Access Token Payload:', payload);
        return payload;
    }
}

export const JwtStrategies = [RefreshTokenStrategy, AccessTokenStrategy];

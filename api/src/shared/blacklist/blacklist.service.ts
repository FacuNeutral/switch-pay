import envs from '@config/envs/env-var.plugin';
import { Injectable, Logger } from '@nestjs/common';
import { BlacklistCacheRepository } from 'src/_common/database/cache/repositories/blacklist-cache.repository';
import { parseTimeDaysToMs, parseTimeMinutesToMs } from 'src/_common/utils/calcs/parse-time';

@Injectable()
export class BlacklistService {


    private readonly logger = new Logger(BlacklistService.name);

    constructor(
        private readonly blacklistRepository: BlacklistCacheRepository,
    ) { }

    async isTokenRevoked(tokenId: string) { return await this.blacklistRepository.exists(tokenId) }

    async revokeToken(tokenId: string, tokenType: "accessToken" | "refreshToken"): Promise<void> {

        let tllMs: number;

        switch (tokenType) {
            case "accessToken":
                tllMs = parseTimeMinutesToMs(envs.USER_ACCESS_TOKEN_EXPIRATION);
                break;
            case "refreshToken":
                tllMs = parseTimeDaysToMs(envs.USER_REFRESH_TOKEN_EXPIRATION);
                break;
        }

        await this.blacklistRepository.create(tokenId, tllMs);
    }
}

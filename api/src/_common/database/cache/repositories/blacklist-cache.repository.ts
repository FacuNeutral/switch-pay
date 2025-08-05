import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BaseNoValueCache } from '../bases/base-no-value-cache';
import envs from '@config/envs/env-var.plugin';
import { parseTimeMinutesToMs, parseTimeDaysToMs } from 'src/_common/utils/calcs/parse-time';

@Injectable()
export class BlacklistCacheRepository extends BaseNoValueCache {

    constructor(@Inject(CACHE_MANAGER) protected cacheManager: Cache) {
        super('blacklist', cacheManager);
    }
}

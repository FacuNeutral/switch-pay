import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BaseNoValueCache } from '../bases/base-no-value-cache';

@Injectable()
export class BlacklistCacheRepository extends BaseNoValueCache {

    constructor(@Inject(CACHE_MANAGER) protected cacheManager: Cache) {
        super('blacklist', cacheManager);
    }
}

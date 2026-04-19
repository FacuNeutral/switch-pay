import { Controller, Delete, Get, Post } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { CacheService, SessionData } from 'src/_common/database/cache/cache.service';
import { BlacklistCacheRepository } from 'src/_common/database/cache/repositories/blacklist-cache.repository';


@Controller('sandbox')
export class SandboxController {

    constructor(
        private readonly sandboxService: SandboxService,
        private readonly blacklistCacheRepository: BlacklistCacheRepository,

    ) { }

    //% Memory Cache

    @Get("memory-cache")
    async getMemoryCache() {

        const tokenRevoked = await this.blacklistCacheRepository.exists('id');
        console.log(tokenRevoked);
        return { message: 'Session retrieved successfully!', tokenRevoked };
    }

    @Post("memory-cache")
    async createMemoryCache() {
        // Initialize the memory cache service
        const RevokedToken = await this.blacklistCacheRepository.create('id', 1);
        console.log(RevokedToken);
        return { message: 'Session created successfully in memory cache!', RevokedToken };
    }

    // @Delete("memory-cache")
    // async deleteMemoryCache() {
    //     // Delete the session from memory cache
    //     await this.cacheService.deleteSession('sandbox');
    //     return { message: 'Session deleted successfully from memory cache!' };
    // }
}

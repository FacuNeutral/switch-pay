import { Controller, Delete, Get, Post } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { CacheService, SessionData } from 'src/_common/database/cache/cache.service';
import { BlacklistDao } from '@cache/dao/blacklist.dao';
import { UserSessionsService } from 'src/application/users/sessions/user-sessions.service';
import Logger from '@logger';

@Controller('sandbox')
export class SandboxController {


    constructor(
        private readonly logger: Logger,
        private readonly sandboxService: SandboxService,
        private readonly BlacklistDao: BlacklistDao,
        private readonly userSessionsService: UserSessionsService
    ) { }

    //% Memory Cache

    @Get("working")
    async getWorking() {
    this.logger.log("The sandbox is working!");
        this.logger.log("Yes si!");
        return { message: 'The sandbox is working!' };
    }

    @Get()
    async getTest() {
        // Test data
        const userId = 'test-user-id';
        const tokenId = 'test-token-id';
        const createSessionDto = { ip: '127.0.0.1', device: 'TestDevice' };

        // 1. Create session
        // const newSession = await this.userSessionsService.create(userId, tokenId, createSessionDto);
        // 2. Find by tokenId
        const sessionByToken = await this.userSessionsService.find(tokenId);

        // this.logger.log(newSession);
        // // 3. Find all user sessions
        // const allSessions = await this.userSessionsService.findAll(userId);

        // // 4. Update session by tokenId
        // await this.userSessionsService.update(tokenId, { device: 'UpdatedDevice' });

        // // 5. Revoke session by tokenId
        // await this.userSessionsService.revoke(tokenId);

        // // 6. Revoke all user sessions
        // await this.userSessionsService.revokeAllUserSessionsUserSessions(userId);

        // return {
        //     newSession,
        //     sessionByToken,
        //     allSessions,
        //     updated: true,
        //     revoked: true,
        //     allRevoked: true
        // };
    }

    @Post("memory-cache")
    async createMemoryCache() {
        // Initialize the memory cache service
        // const RevokedToken = await this.BlacklistDao.create('id', 1);
        // console.log(RevokedToken);
        // return { message: 'Session created successfully in memory cache!', RevokedToken };
    }

    // @Delete("memory-cache")
    // async deleteMemoryCache() {
    //     // Delete the session from memory cache
    //     await this.cacheService.deleteSession('sandbox');
    //     return { message: 'Session deleted successfully from memory cache!' };
    // }
}

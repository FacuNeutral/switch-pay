import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Logger } from "@config/loggers";
export interface SessionData {
    userId: string;
    device: string;
    ip: string;
    createdAt: Date;
    expiresAt: Date;
}

@Injectable()
export class CacheService {

    constructor(@Inject(CACHE_MANAGER) protected cacheManager: Cache) {

    }


    // async getById(sessionId: string): Promise<SessionData> {
    //     const session = await this.cacheManager.get<SessionData>(sessionId);
    //     if (!session) throw new NotFoundException(`Session ${sessionId} not found in cache`);

    //     this.logger.verbose(`Session ${sessionId} retrieved from cache`);

    //     return session;
    // }

    // async saveSession(sessionId: string, data: SessionData, ttlSeconds: number = 3600) {
    //     const session = await this.cacheManager.get<SessionData>(sessionId);
    //     if (session) throw new ConflictException(`Session ${sessionId} already exists in cache`);
    //     const saved = await this.cacheManager.set(sessionId, data, ttlSeconds);


    //     this.logger.verbose(`Session ${sessionId} saved with TTL of ${ttlSeconds} seconds`);
    //     return saved;
    // }

    // async updateSession(sessionId: string, data: Partial<SessionData>) {
    //     const session = await this.cacheManager.get<SessionData>(sessionId);
    //     if (!session) throw new NotFoundException(`Session ${sessionId} not found in cache`);

    //     const updatedSession = { ...session, ...data };
    //     await this.cacheManager.set(sessionId, updatedSession);

    //     this.logger.verbose(`Session ${sessionId} updated in cache`);

    //     return updatedSession;
    // }

    // async deleteSession(sessionId: string) {
    //     const deleted = await this.cacheManager.del(sessionId);

    //     this.logger.verbose(`Session ${deleted} deleted from cache`);

    //     return deleted;
    // }
}

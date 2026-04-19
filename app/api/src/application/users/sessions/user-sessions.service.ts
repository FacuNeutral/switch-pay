import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionDao } from 'src/_common/database/cold-storage/dao/session.dao';
import { SessionDto } from 'src/_common/database/cold-storage/dtos/session.dto';
import { SessionSqlite } from 'src/_common/database/cold-storage/entities/session.sqlite.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Logger from '@logger';
import { AutoLogErrors } from '@config/loggers/auto-log-errors.decorator';
AutoLogErrors()
@Injectable()
export class UserSessionsService {


    constructor(
        private readonly logger: Logger,
        private readonly sessionDao: SessionDao,
        @InjectRepository(SessionSqlite, 'sqlite')
        private readonly sessionRepository: Repository<SessionSqlite>
    ) { }

    async create(createSessionDto: { userId: string, ip: string, device: string }) {
        const newSession = await this.sessionDao.create({
            userId: createSessionDto.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            device: createSessionDto.device,
            ip: createSessionDto.ip,
        });

        this.logger.log("new session created");

        return newSession;
    }

    async find(tokenId: string) {
        const session = await this.sessionDao.find(tokenId);

        this.logger.verbose("session fetched");

        return session;
    }

    async findAll(userId: string) {
        const sessions = await this.sessionDao.findAllByUserId(userId);

        this.logger.verbose("all sessions fetched");

        return sessions;
    }

    async update(tokenId: string, updateSessionDto: Partial<SessionDto>) {
        const session = await this.sessionDao.update(tokenId, updateSessionDto).save();

        this.logger.log("session updated");
    }

    async revoke(tokenId: string) {
        await this.sessionDao.delete(tokenId);

        this.logger.verbose("session revoked");
    }

    async revokeAllUserSessions(userId: string) {
        await this.sessionDao.deleteAllByUserId(userId);

        this.logger.verbose("all user sessions revoked successfully");
    }

}

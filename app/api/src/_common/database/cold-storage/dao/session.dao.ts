import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseDao, GenericOperationDao } from "../../../config/typeorm/base-dao";
import { User } from "@db/entities";
import { CreateUserDto } from "@auth/dtos/user-auth.dto";
import { SessionSqlite } from "../entities/session.sqlite.entity";
import { SessionDto } from "../dtos/session.dto";

@Injectable()
export class SessionDao extends GenericOperationDao<SessionDto> {

    constructor(

        @InjectRepository(SessionSqlite, "sqlite")
        private readonly sessionRepository: Repository<SessionSqlite>,
    ) { super(sessionRepository); }

    async find(id: string) {
        const session = await this.sessionRepository.findOneBy({ id });
        if (!session) throw new BadRequestException("session not found");

        this.logger.verbose("session retrieved");

        return session;
    }

    async findAllByUserId(userId: string) {
        const entities: SessionSqlite[] = await this.sessionRepository.find({
            where: { userId },
        });
        if (entities.length === 0) throw new BadRequestException("no sessions found");
        this.logger.verbose("all sessions have been retrieved");
        return entities;
    }


    async delete(id: string) {
        const result = await this.sessionRepository.delete({ id });
        if (result.affected === 0) throw new BadRequestException("session not found");

        this.logger.verbose("session deleted successfully");
    }

    async deleteAllByUserId(userId: string) {
        const result = await this.sessionRepository.delete({ userId });
        if (result.affected === 0) throw new BadRequestException("no sessions found");

        this.logger.verbose("all sessions have been deleted successfully");
    }

}
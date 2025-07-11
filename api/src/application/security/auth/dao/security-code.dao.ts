import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoLogErrors } from "src/_common/config/loggers/auto-log-errors.decorator";
import { UserDto } from "src/_common/database/dtos/user.dto";
import { User } from "src/_common/database/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/application/security/auth/dto/user-auth.dto";
import { SecurityCode } from "src/_common/database/entities/security-code.entity";
import { UserAction } from "src/_common/database/interfaces/user-action.interface";
import { createRandomCode } from "src/_common/utils/generators/random-code";
import { hash } from "bcrypt";
import { UpdateQueryBuilder } from "src/_common/database/dao/query-builders/update-query-builder";

@Injectable()
export class SecurityCodeDao {

    private readonly logger = new Logger(SecurityCodeDao.name);

    constructor(
        @InjectRepository(SecurityCode)
        private readonly securityCodeRepository: Repository<SecurityCode>,
    ) { }

    //% Basic operations

    async createByUserId(userId: string, userAction: UserAction): Promise<SecurityCode> {
        try {
            let db_security_code = await this.securityCodeRepository.findOneBy({ userId, userAction });
            let securityCode: SecurityCode;
            let code = createRandomCode();

            if (!db_security_code) {
                //* Create code
                const newSecurityCode = this.securityCodeRepository.create({ userId, userAction });

                securityCode = await this.securityCodeRepository.save(newSecurityCode);

            } else {
                //* Update code
                db_security_code.updatedAt = new Date();
                db_security_code.code = await hash(code, 10);

                securityCode = await this.securityCodeRepository.save(db_security_code);
                securityCode.code = code;
            }

            this.logger.log(`Security code for user ID ${userId} created successfully`);

            return securityCode;

        } catch (error) {
            throw await this.handleException(error);
        }
    }

    async getByUserId(userId: string, userAction: UserAction): Promise<SecurityCode> {
        try {
            const securityCode = await this.securityCodeRepository.findOneBy({ userId, userAction });
            if (!securityCode) throw new BadRequestException('Security code not found for the specified user action');

            this.logger.log(`Security code for user ID ${userId} retrieved successfully`);

            return securityCode;

        } catch (error) {
            throw await this.handleException(error);
        }
    }


    update(id: string, securityCode: Partial<SecurityCode>) {
        const newSecurityCode = { ...securityCode, id };

        return new UpdateQueryBuilder<SecurityCode>(
            this.securityCodeRepository,
            newSecurityCode,
            this.handleException
        );
    }

    async getById(id: string): Promise<SecurityCode> {
        try {
            const securityCode = await this.securityCodeRepository.findOneBy({ id });
            if (!securityCode) throw new BadRequestException('Security code not found');

            this.logger.log(`Security code ID ${id} retrieved successfully`);

            return securityCode;

        } catch (error) {
            throw await this.handleException(error);
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            const result = await this.securityCodeRepository.delete(id);
            if (result.affected === 0) throw new BadRequestException('Security code not found');

            this.logger.log(`Security code ID ${id} deleted successfully`);

        } catch (error) {
            throw await this.handleException(error);
        }
    }

    // async getUserById(id: string): Promise<User> {
    //     try {
    //         const user = await this.userRepository.findOneBy({ id });
    //         if (!user) throw new BadRequestException('user not found');

    //         this.logger.log(`User ID ${id} retrieved`);

    //         return user;

    //     } catch (error) {
    //         throw await this.handleException(error);
    //     }
    // }

    // async saveUpdatedUser(user: Partial<UserDto>): Promise<User> {
    //     const updatedUser = await this.userRepository.save(user);
    //     this.logger.log(`User ID ${updatedUser.id} updated successfully`);

    //     return updatedUser;
    // }

    // async create(user: CreateUserDto) {
    //     try {
    //         const user_db = await this.userRepository.findOneBy({
    //             email: user.email
    //         });
    //         if (user_db) throw new ConflictException("user already exists with this email");

    //         const newUser = this.userRepository.create(user);
    //         await this.userRepository.save(newUser);

    //         this.logger.log(`User ID ${newUser.id} created successfully`);

    //         return newUser;

    //     } catch (error) {
    //         throw await this.handleException(error);
    //     }
    // }

    private async handleException(error: any) {

        if (error.code === "22P02")
            throw new ConflictException("invalid User ID format");

        if (error instanceof HttpException) throw error;

        this.logger.error(`Internal error: ${error.message}`);
        throw new InternalServerErrorException("an unexpected error occurred while processing the request");

    }
}
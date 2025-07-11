import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SecurityCode } from "src/_common/database/entities/security-code.entity";
import { UserAction } from "src/_common/database/interfaces/user-action.interface";
import { createRandomCode } from "src/_common/utils/generators/random-code";
import { Repository } from "typeorm";
import { GenericOperationDao } from "./base/base-dao";

@Injectable()
export class SecurityCodeDao extends GenericOperationDao<SecurityCode> {

    constructor(
        @InjectRepository(SecurityCode)
        private readonly securityCodeRepository: Repository<SecurityCode>,
    ) { super(securityCodeRepository) }

    async createByUserId(userId: string, userAction: UserAction): Promise<SecurityCode> {
        try {
            let db_security_code = await this.securityCodeRepository.findOneBy({ userId, userAction });
            let securityCode: SecurityCode;
            const code =
                userAction === UserAction.VerifyEmail
                    ? createRandomCode(6)
                    : createRandomCode(8);

            if (!db_security_code) {
                //* Create code
                const newSecurityCode = this.securityCodeRepository.create({ userId, userAction, code });

                securityCode = await this.securityCodeRepository.save(newSecurityCode);

            } else {
                //* Update code
                db_security_code.updatedAt = new Date();
                db_security_code.code = code;

                securityCode = await this.securityCodeRepository.save(db_security_code);
            }

            //* Return code without hashing
            securityCode.code = code;

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


    private async handleException(error: any) {

        if (error.code === "22P02")
            throw new ConflictException("invalid User ID format");

        if (error instanceof HttpException) throw error;

        this.logger.error(`Internal error: ${error.message}`);
        throw new InternalServerErrorException("an unexpected error occurred while processing the request");

    }
}
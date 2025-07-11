import { BadRequestException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import envs from "src/_common/config/envs/env-var.plugin";
import { AutoLogErrors } from "src/_common/config/loggers/auto-log-errors.decorator";
import { UserAction } from "src/_common/database/interfaces/user-action.interface";
import { EmailSenderService } from "src/integrations/email/email-sender.service";
import { SecurityCodeDao } from "../../../_common/database/dao/security-code.dao";
import { UserDao } from "../../../_common/database/dao/user.dao";
import { parseTimeMinutesToMs } from "../auth/helpers/parse-time-to-ms";

@Injectable()
@AutoLogErrors()
export class ProofsService {

    private readonly logger = new Logger(ProofsService.name);

    constructor(
        private readonly userDao: UserDao,
        private readonly securityCodeDao: SecurityCodeDao,
        private emailSender: EmailSenderService,
        @Inject("USER_RECOVERY_TOKEN")
        private readonly recoveryTokenService: JwtService,
    ) { }

    async sendVerificationCode(userEmail: string, userAction: UserAction): Promise<void> {
        const db_user = await this.userDao.getUserByEmail(userEmail);
        const { code } = await this.securityCodeDao.createByUserId(db_user.id, userAction);

        await this.emailSender.sendVerificationCode(db_user.email, {
            firstName: db_user.firstName,
            lastName: db_user.lastName,
            code,
            userAction
        });

        this.logger.log(`code sent to user "ID: ${db_user.id}" email successfully`);

    }

    async verifyAndGenerateToken(userEmail: string, userAction: UserAction, code: string): Promise<string> {
        const db_user = await this.userDao.getUserByEmail(userEmail);
        const db_security_code = await this.securityCodeDao.getByUserId(db_user.id, userAction);
        
        if (!db_security_code)
            throw new NotFoundException("security code not found for this user");
        if (db_security_code.used)
            throw new BadRequestException("your code has already been used, please request a new one");

        const checkExpiration: boolean = new Date().getTime() - db_security_code.updatedAt.getTime() > parseTimeMinutesToMs(envs.USER_RECOVERY_TOKEN_EXPIRATION);
        if (checkExpiration)
            throw new BadRequestException("your code has expired, please request a new one");

        const checkCode = await bcrypt.compare(code, db_security_code.code);
        if (!checkCode) throw new UnauthorizedException("your code is invalid");

        const token = this.recoveryTokenService.sign({
            id: db_user.id,
            codeId: db_security_code.id,
            userAction
        });

        await this.securityCodeDao.update(db_security_code.id, { used: true }).save();

        this.logger.log(`token for user "ID: ${db_user.id}" for action "${userAction}" obtained successfully`);


        return token;
    }

}

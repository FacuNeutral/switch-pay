import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { AutoLogErrors } from 'src/_common/config/loggers/auto-log-errors.decorator';
import { SecurityCodeDao } from 'src/_common/database/dao/security-code.dao';
import { UserDao } from 'src/_common/database/dao/user.dao';
import { RecoveryUserData } from 'src/_common/database/interfaces/user-action.interface';

@Injectable()
@AutoLogErrors()
export class RecoveryService {

    private readonly logger = new Logger(RecoveryService.name);

    constructor(
        private readonly userDao: UserDao,
        private readonly securityCodeDao: SecurityCodeDao,
    ) { }

    
    async resetUserPassword(data: RecoveryUserData, newPassword: string): Promise<void> {

        const db_security_code = await this.securityCodeDao.getByUserId(data.id, data.userAction);
        if (db_security_code.id !== data.codeId)
            throw new UnauthorizedException("invalid security code");

        const password = await bcrypt.hash(newPassword, 10);
        await this.userDao.update(data.id, { password }).save();

        // await this.securityCodeDao.delete(db_security_code.id);

        this.logger.log(`user "ID: ${data.id}" password reset successfully`);
    }

    async resetUserPinCode(data: RecoveryUserData, newPinCode: string): Promise<void> {
        const db_security_code = await this.securityCodeDao.getByUserId(data.id, data.userAction);
        if (db_security_code.id !== data.codeId) throw new UnauthorizedException("invalid security code");

        const pinCode = await bcrypt.hash(newPinCode, 10);

        await this.userDao.update(data.id, { pinCode }).save();
        await this.securityCodeDao.delete(db_security_code.id);

        this.logger.log(`user "ID: ${data.id}" pin code reset successfully`);
    }

}

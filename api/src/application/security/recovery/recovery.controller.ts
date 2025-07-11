import { Controller, InternalServerErrorException, Patch } from '@nestjs/common';
import { Body, Injectable, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RecoveryTokenAuthGuard } from '../auth/guards/recovery-auth.guard';
import { ResMessage } from 'src/_common/config/response-format/single-response/response-message.decorator';
import { RecoveryUser } from 'src/_common/decorators/token-user.decorator';
import { RecoveryUserData } from 'src/_common/database/interfaces/user-action.interface';
import { UserPasswordDto, UserPinCodeDto } from '../auth/dto/user-auth.dto';
import { RecoveryService } from './recovery.service';
import { CONSTRAINT } from 'sqlite3';

@Controller('recovery')
export class RecoveryController {

    constructor(
        private readonly recoveryService: RecoveryService,
    ) { }


    @UseGuards(RecoveryTokenAuthGuard)
    @Patch("reset-password")
    @ResMessage("password reset successfully")
    async resetUserPassword(@RecoveryUser() user: RecoveryUserData, @Body() { password }: UserPasswordDto) {
        console.log(user);
        await this.recoveryService.resetUserPassword(user, password)
            //* send generic error message to avoid info leakage.
            .catch(() => {
                throw new InternalServerErrorException("sorry, there was an error while trying to reset your password");
            });
    }

    @UseGuards(RecoveryTokenAuthGuard)
    @Patch("reset-pin-code")
    @ResMessage("pin code reset successfully")
    async resetUserPinCode(@RecoveryUser() user: RecoveryUserData, @Body() { pinCode }: UserPinCodeDto) {
        await this.recoveryService.resetUserPinCode(user, pinCode)
            //* send generic error message to avoid info leakage.
            .catch(() => {
                throw new InternalServerErrorException("sorry, there was an error while trying to reset your pin code");
            });
    }

}

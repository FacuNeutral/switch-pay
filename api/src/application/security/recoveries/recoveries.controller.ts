import { Controller, InternalServerErrorException, Patch } from '@nestjs/common';
import { Body, Injectable, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RecoveryTokenAuthGuard } from '@auth/guards/recovery-auth.guard';

import { RecoveryUserData } from '@db/interfaces';
import { UserPasswordDto, UserPinCodeDto } from '@auth/dtos/user-auth.dto';
import { RecoveryService } from './recoveries.service';
import { CONSTRAINT } from 'sqlite3';
import { RecoveryUser } from 'src/_common/decorators/token-user.decorator';
import { ResMessage } from '@config/response-format/single-response/response-message.decorator';

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

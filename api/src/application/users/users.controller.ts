import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshTokenAuthGuard } from '../auth/guards/user-auth.guard';
import { ResMessage } from 'src/_common/config/response-format/single-response/response-message.decorator';
import { UserId } from 'src/_common/decorators/token-user.decorator';
import { SetUpPinCodeDto, SetUpProfileDto } from './dto/set-up.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @UseGuards(RefreshTokenAuthGuard)
    @Patch("set_up/profile")
    @ResMessage("profile saved successfully")
    async setUpProfile(@Body() body: SetUpProfileDto, @UserId() userId: string) {
        await this.usersService.setUpProfile(userId, body);

    }

    @UseGuards(RefreshTokenAuthGuard)
    @Patch("set_up/pin_code")
    @ResMessage("pin code applied successfully")
    async setUpPinCode(@Body() { pinCode }: SetUpPinCodeDto, @UserId() userId: string) {
        await this.usersService.setUpPinCode(userId, pinCode);
    }

}


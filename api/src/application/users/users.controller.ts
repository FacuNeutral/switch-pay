import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshTokenAuthGuard } from '../auth/guards/user-auth.guard';
import { ResMessage } from 'src/_common/config/response-format/single-response/response-message.decorator';
import { UserId } from 'src/_common/decorators/token-user.decorator';
import { SetUpPinCodeDto, SetUpProfileDto } from './dto/set-up.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @UseGuards(RefreshTokenAuthGuard)
    @Get("set_up/profile")
    @ResMessage("profile saved")
    async setUpProfile(@Body() body: SetUpProfileDto, @UserId() userId: string) {

        await this.usersService.setUpProfile(userId, body);

    }

    @UseGuards(RefreshTokenAuthGuard)
    @Get("set_up/pin_code")
    @ResMessage("profile saved")
    async setUpPinCode(@Body() { pinCode }: SetUpPinCodeDto, @UserId() userId: string) {


    }

}


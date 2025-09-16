import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserSetUpService } from './user-set-up.service';
import { RefreshTokenAuthGuard } from '@auth/guards/user-auth.guard';
import { ResMessage } from 'src/_common/config/response-format/single-response/response-message.decorator';
import { UserId } from 'src/_common/decorators/token-user.decorator';
import { SetUpPinCodeDto, SetUpProfileDto } from './dtos/set-up.dto';

@Controller('users')
export class UserSetUpController {
    constructor(private readonly UserSetUpService: UserSetUpService) { }


    @UseGuards(RefreshTokenAuthGuard)
    @Patch("set-up/profile")
    @ResMessage("profile saved successfully")
    async setUpProfile(@Body() body: SetUpProfileDto, @UserId() userId: string) {
        await this.UserSetUpService.setUpProfile(userId, body);

    }

    @UseGuards(RefreshTokenAuthGuard)
    @Patch("set-up/pin-code")
    @ResMessage("pin code applied successfully")
    async setUpPinCode(@Body() { pinCode }: SetUpPinCodeDto, @UserId() userId: string) {
        await this.UserSetUpService.setUpPinCode(userId, pinCode);
    }

    //test endpoint

    @Get("test")
    @ResMessage("test endpoint")
    async testEndpoint() {

        console.log("Test endpoint hit");

    }

}


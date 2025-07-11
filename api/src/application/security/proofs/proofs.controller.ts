import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { ResMessage } from 'src/_common/config/response-format/single-response/response-message.decorator';
import { SendOttDto } from './dto/send-ott.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ProofsService } from './proofs.service';

@Controller('proofs')
export class ProofsController {

    constructor(
        private readonly proofsService: ProofsService,
    ) { }

    @Post("send-ott")
    @ResMessage("if successful, you will receive a verification code in your email")
    async sendOtt(@Body() { email, userAction }: SendOttDto) {
        await this.proofsService.sendVerificationCode(email, userAction)

            //* send generic error message to avoid info leakage.
            .catch(() => {
                throw new InternalServerErrorException("sorry, there was an error while trying to send the code");
            });
    }

    @Post("verify-code")
    @ResMessage("if successful, you will receive a token")
    async verifyCode(@Body() { email, userAction, code }: VerifyCodeDto) {

        const token = await this.proofsService.verifyAndGenerateToken(email, userAction, code)

            //* send generic error message to avoid info leakage.
            .catch(() => {
                throw new InternalServerErrorException("sorry, there was an error while trying to verify the code");
            });

        return { token };
    }

}

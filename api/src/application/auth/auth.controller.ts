import { Controller, Get, Post, Body, Param, Delete, Put, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResMessage } from 'src/_common/config/response-format/single-response/response-message.decorator';
import { Response } from 'express';
import sendResponse from 'src/_common/config/response-format/custom-response/send-response.helper';
import { BasicCredentialsDto } from './dto/basic-credentials.dto';
import { RefreshTokenAuthGuard, UserAuthGuard } from './guards/jwt-auth.guard';
import { UserId } from 'src/_common/decorators/token-user.decorator';
import { parseDaysToMaxAge } from './helpers/parse-days-to-max-age';
import envs from 'src/_common/config/envs/env-var.plugin';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ResMessage('user created successfully')
  async createUser(@Body() body: BasicCredentialsDto) {

    await this.authService.createUser(body);

  }

  @Post('login')
  async loginUser(@Res() res: Response, @Body() body: BasicCredentialsDto) {
    const userAuthenticated = await this.authService.loginUser(body);

    res.cookie("refresh_token", userAuthenticated.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: parseDaysToMaxAge(envs.USER_REFRESH_TOKEN_EXPIRATION),
    });

    const { token, ...userData } = userAuthenticated;

    sendResponse(res, "login successfully", userData);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('session')
  @ResMessage('session started successfully')
  async createUserSession(@Res() res: Response, @Body('pinCode') pinCode: string, @UserId() userId: string) {
    const userSession = await this.authService.createUserSession(userId, pinCode);

    res.cookie("access_token", userSession.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: parseDaysToMaxAge(envs.USER_ACCESS_TOKEN_EXPIRATION),
    });

    const { token, ...userData } = userSession;

    sendResponse(res, "session started successfully", userData);
  }


  //% Test Routes

  @Post('check_credentials')
  @ResMessage('your credentials are valid')
  async checkUserCredentials(@Body() body: BasicCredentialsDto) {
    // await this.authService.checkUserCredentials(body);
  }

  @UseGuards(UserAuthGuard)
  @Get('test_session')
  @ResMessage('User fetched successfully')
  async testSession() {
    return {
      email: "test",
      password: "test",
    }
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Get('test_login')
  @ResMessage('User login successfully')
  async testLogin(@Req() req: Request & { user?: any }) {
    console.log(req?.user);
    return {
      email: "login",
      password: "test pass",
    }
  }

}
import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Response } from "express";

import envs from "src/_common/config/envs/env-var.plugin";
import sendResponse from "src/_common/config/response-format/custom-response/send-response.helper";
import { ResMessage } from "src/_common/config/response-format/single-response/response-message.decorator";
import { UserId } from "src/_common/decorators/token-user.decorator";

import { UsersService } from "../../users/users.service";
import { AuthService } from "./auth.service";
import { BasicCredentialsDto, CreateUserDto, UserPinCodeDto } from "./dto/user-auth.dto";
import { InitialUserAuthGuard, RefreshTokenAuthGuard, UserAuthGuard } from "./guards/user-auth.guard";
import { parseTimeDaysToMs, parseTimeMinutesToMs } from "./helpers/parse-time-to-ms";

@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post("register")
  @ResMessage("user created successfully")
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  @Post("login")
  async loginUser(@Res() res: Response, @Body() body: BasicCredentialsDto) {
    const userAuthenticated = await this.authService.loginUser(body);

    res.cookie("refreshToken", userAuthenticated.token, {
      httpOnly: true,
      secure: !envs.DEV_MODE,
      sameSite: envs.DEV_MODE ? "lax" : "strict",
      maxAge: parseTimeDaysToMs(envs.USER_REFRESH_TOKEN_EXPIRATION),
    });

    const { token, ...userData } = userAuthenticated;

    sendResponse(res, "login successfully", userData);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post("session")
  @ResMessage("session started successfully")
  async createUserSession(@Res() res: Response, @Body() { pinCode }: UserPinCodeDto, @UserId() userId: string) {
    const userSession = await this.authService.createUserSession(userId, pinCode);

    res.cookie("accessToken", userSession.token, {
      httpOnly: true,
      secure: !envs.DEV_MODE,
      sameSite: envs.DEV_MODE ? "lax" : "strict",
      maxAge: parseTimeMinutesToMs(envs.USER_ACCESS_TOKEN_EXPIRATION),
    });

    const { token, ...userData } = userSession;

    sendResponse(res, "session started successfully", userData);
  }


  //% Test Routes

  @UseGuards(UserAuthGuard)
  @Get("test-session")
  @ResMessage("User fetched successfully")
  async testSession() {
    return {
      email: "test",
      password: "test",
    }
  }

  @UseGuards(InitialUserAuthGuard)
  @Get("initial-user")
  @ResMessage("User fetched successfully")
  async initialUser() {
    return {
      email: "test",
      password: "test",
    }
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Get("test-login")
  @ResMessage("User login successfully")
  async testLogin(@Req() req: Request & { user?: any }) {
    console.log(req?.user);
    return {
      email: "login",
      password: "test pass",
    }
  }

}
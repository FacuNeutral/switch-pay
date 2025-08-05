import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Response } from "express";

import envs from "@envs";
import sendResponse from "@config/response-format/custom-response/send-response.helper";
import { ResMessage } from "@config/response-format/single-response/response-message.decorator";
import { CurrentUser, TokenId, UserId } from "@decorators/token-user.decorator";

import { UsersService } from "@users/users.service";
import { AuthService } from "./auth.service";
import { BasicCredentialsDto, CreateUserDto, UserPinCodeDto } from "./dtos/user-auth.dto";
import { AccessTokenAuthGuard, InitialUserAuthGuard, RefreshTokenAuthGuard, UserAuthGuard } from "./guards/user-auth.guard";
import { parseTimeDaysToMs, parseTimeMinutesToMs } from "../../../_common/utils/calcs/parse-time";
import { UserToken } from "@db/interfaces/user-token.interface";

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
  @Post("logout")
  async logoutUser(@Res() res: Response, @CurrentUser() user: UserToken) {
    await this.authService.logoutUser(user.id, user.tokenId);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: !envs.DEV_MODE,
      sameSite: envs.DEV_MODE ? "lax" : "strict",
    });

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: !envs.DEV_MODE,
      sameSite: envs.DEV_MODE ? "lax" : "strict",
    });

    sendResponse(res, "logout successfully");
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post("session")
  @ResMessage("session started successfully")
  async createUserSession(@Res() res: Response, @Body() { pinCode }: UserPinCodeDto, @CurrentUser() user: UserToken) {
    const userSession = await this.authService.createUserSession(user.id, pinCode, user.tokenId);

    res.cookie("accessToken", userSession.token, {
      httpOnly: true,
      secure: !envs.DEV_MODE,
      sameSite: envs.DEV_MODE ? "lax" : "strict",
      maxAge: parseTimeMinutesToMs(envs.USER_ACCESS_TOKEN_EXPIRATION),
    });

    const { token, ...userData } = userSession;

    sendResponse(res, "session started successfully", userData);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Post("logout-session")
  async logoutUserSession(@Res() res: Response, @CurrentUser() user: UserToken) {
    await this.authService.logoutUserSession(user.id, user.tokenId);

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: !envs.DEV_MODE,
      sameSite: envs.DEV_MODE ? "lax" : "strict",
    });

    sendResponse(res, "session closed successfully");
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
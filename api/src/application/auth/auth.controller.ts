import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Response } from "express";

import envs from "src/_common/config/envs/env-var.plugin";
import sendResponse from "src/_common/config/response-format/custom-response/send-response.helper";
import { ResMessage } from "src/_common/config/response-format/single-response/response-message.decorator";
import { CurrentUser, RecoveryUser, UserId } from "src/_common/decorators/token-user.decorator";

import { AuthService } from "./auth.service";
import { BasicCredentialsDto, CreateUserDto, UserEmailDto, UserPasswordDto, UserPinCodeDto } from "./dto/user-auth.dto";
import { InitialUserAuthGuard, RefreshTokenAuthGuard, UserAuthGuard } from "./guards/user-auth.guard";
import { parseTimeDaysToMs, parseTimeMinutesToMs } from "./helpers/parse-time-to-ms";
import { UsersService } from "../users/users.service";
import { VerifyCodeDto } from "./dto/verify-code.dto";
import { RecoveryTokenAuthGuard } from "./guards/recovery-auth.guard";
import { User } from "src/_common/database/entities/user.entity";
import { RecoveryUserData } from "src/_common/database/interfaces/user-action.interface";

@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService, // Assuming you have a users service for user-related operations
  ) { }

  @Post("register")
  @ResMessage("user created successfully")
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  @Post("login")
  async loginUser(@Res() res: Response, @Body() body: BasicCredentialsDto) {
    const userAuthenticated = await this.authService.loginUser(body);

    res.cookie("refresh_token", userAuthenticated.token, {
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

    res.cookie("access-token", userSession.token, {
      httpOnly: true,
      secure: !envs.DEV_MODE,
      sameSite: envs.DEV_MODE ? "lax" : "strict",
      maxAge: parseTimeMinutesToMs(envs.USER_ACCESS_TOKEN_EXPIRATION),
    });

    const { token, ...userData } = userSession;

    sendResponse(res, "session started successfully", userData);
  }

  @Post("password/forgot")
  @ResMessage("if successful, you will receive a code to reset your password in your email")
  async recoveryUserPassword(@Body() { email }: UserEmailDto) {
    await this.authService.recoverUserPassword(email)

      //* no error responses to avoid info leakage.
      .catch((e) => null);
  }

  @Get("password/verify-code")
  @ResMessage("if successful, you will receive a token to reset your password")
  async verifyUserPasswordCode(@Body() { email, code }: VerifyCodeDto) {
    const token = await this.authService.obtainTokenForResetPassword(email, code)

      //* no error responses to avoid info leakage.
      .catch((e) => null);

    return { token };

  }
  @UseGuards(RecoveryTokenAuthGuard)
  @Post("password/reset")
  @ResMessage("password reset successfully")
  async resetUserPassword(@RecoveryUser() user: RecoveryUserData, @Body() { password }: UserPasswordDto) {

      await this.authService.resetUserPassword(user, password)
      .catch(() => {
        throw new UnauthorizedException("your token is invalid or expired");
      });
  }

  @Post("pin-code/forgot")
  @ResMessage("if successful, you will receive a code to reset your pincode in your email")
  async recoveryUserPinCode(@Body() { email }: UserEmailDto) {
    await this.authService.recoverUserPinCode(email)

      //* no error responses to avoid info leakage.
      .catch((e) => null);
  }

  // @Post("recovery/reset_pincode")
  // @ResMessage("a code has been sent to your email to reset your pincode")
  // async recoveryUserPinCode(@Body() { email }: UserEmailDto) {
  //   await this.authService.recoveryUserPinCode(email);
  // }

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
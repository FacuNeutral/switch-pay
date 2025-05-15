import { Controller, Get, Post, Body, Param, Delete, Put, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResMessage } from 'src/_common/config/response-format/single-response/response-message.decorator';
import { Response } from 'express';
import sendResponse from 'src/_common/config/response-format/multiple-response/send-response.helper';
import { BasicCredentialsDto } from './dto/basic-credentials.dto';
import { UserSessionLoginGuard } from './guards/user-session-login.guard';
import { UserJwtGuard } from './guards/user-jwt.guard';
import { UserSessionGuard } from './guards/user-session.guard';
import { SessionDto } from './dto/session.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ResMessage('user created successfully')
  async createUser(@Body() body: BasicCredentialsDto) {
    // console.log("createUserDto", createUserDto);
    await this.authService.createUser(body);

  }

  @Post('login')
  @ResMessage('login successfully')
  async loginUser(@Body() body: BasicCredentialsDto) {
    return await this.authService.loginUser(body);
  }

  @UseGuards(UserJwtGuard, UserSessionLoginGuard)
  @Post('session')
  @ResMessage('session started successfully')
  async createUserSession(@Body('pinCode') pinCode: string) { }


  //% Test Routes

  @Post('check_credentials')
  @ResMessage('your credentials are valid')
  async checkUserCredentials(@Body() body: BasicCredentialsDto) {
    await this.authService.checkUserCredentials(body);
  }

  @UseGuards(UserSessionGuard)
  @Get('test_session')
  @ResMessage('User fetched successfully')
  async testSession() {
    return {
      email: "test",
      password: "test",
    }
  }

  @UseGuards(UserJwtGuard)
  @Get('test_login')
  @ResMessage('User login successfully')
  async testLogin() {
    return {
      email: "login",
      password: "test pass",
    }
  }

}
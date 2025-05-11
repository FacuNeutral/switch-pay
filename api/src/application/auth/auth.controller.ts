import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BasicCredentialsDto, LoginUserDto } from './dto/login-user.dto';
import { ResponseMessage } from 'src/_common/config/response-format/single-response/response-message.decorator';
import { Response } from 'express';
import sendResponse from 'src/_common/config/response-format/multiple-response/send-response.helper';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    // console.log("createUserDto", createUserDto);
    await this.authService.createUser(createUserDto);

    return "User created successfully";
  }




  @Post('check_credentials')
  @ResponseMessage('your credentials are valid')
  async checkCredentials(@Body() body: BasicCredentialsDto) {

     await this.authService.checkAndGetCredentials(body);

  }

  @Post('login')
  @ResponseMessage('login successfully')
  async loginUser(@Body() body: LoginUserDto) {
    return await this.authService.loginUser(body);
  }

  @Get('test')
  @ResponseMessage('User fetched successfully')
  async test() {
    return "sdsd";
    // return sendResponse(res, {
    //   email: "test",
    //   password: "test",
    // }, `User fetched successfully`);

    return {
      email: "test",
      password: "test",
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: any) {

  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {

  }

}
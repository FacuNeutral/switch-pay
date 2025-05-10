import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BasicCredentialDto } from './dto/login-user.dto';
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



  @Post('pre_login')
  checkCredential(@Body() body: BasicCredentialDto) {
    return this.authService.checkCredential(body);
  }

  @Post('login')
  loginUser(@Body() body: any) {
    console.log("body");
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
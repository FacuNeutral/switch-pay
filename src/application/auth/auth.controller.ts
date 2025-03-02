import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() body: any) {

  }

  @Post('login')
  loginUser(@Body() body: any) {

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

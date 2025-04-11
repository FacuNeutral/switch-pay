import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.authService.createUser(createUserDto);
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

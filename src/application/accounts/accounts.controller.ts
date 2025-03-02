import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {

    @Post()
    create(@Body() body: any) {

    }

    @Get(':id')
    findOne(@Param('id') id: string) {

    }

    @Get('')
    findAll(@Param('userId') userId: string) {

    }

    @Post(':id')
    updateAccount(@Param('id') id: string, @Body() body: any) {

    }

    @Post(':id')
    removeAccount(@Param('id') id: string) {

    }

}

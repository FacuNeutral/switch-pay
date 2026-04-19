import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('transactions')
export class TransactionsController {

    @Post('deposit')
    deposit(@Body() depositDto: any) {

    }

    @Post('withdraw')
    withdraw(@Body() withdrawDto: any) {

    }

    @Post('transfer')
    transfer(@Body() transferDto: any) {

    }

    @Get(':id')
    findOne(@Param('id') id: string) {

    }

    @Get(':id/transactions')
    findAll(@Param('id') id: string) {

    }
}

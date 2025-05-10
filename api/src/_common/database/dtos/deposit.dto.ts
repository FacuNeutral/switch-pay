import { IsDecimal, IsIn, IsNumber, IsUUID } from 'class-validator';
import { CurrencyType } from '../entities/bank-transaction.entity';

export class DepositDto {
    @IsUUID()
    accountId: string;

    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    amount: number;

    @IsIn(CurrencyType)
    currency: typeof CurrencyType[number];
}

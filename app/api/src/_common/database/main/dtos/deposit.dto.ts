import { IsDecimal, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { CurrencyType } from '../interfaces/bank-account.interface';

export class DepositDto {
    @IsUUID()
    accountId: string;

    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    amount: number;

    @IsEnum(CurrencyType)
    currency: CurrencyType;
}

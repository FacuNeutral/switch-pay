import V, { IsDecimal, IsIn, IsNumber, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { BankAccount } from '../entities/bank-account.entity';

export class BankAccountDto implements Pick<BankAccount, "currency" | "balance" | "status"> {

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsString()
    @Matches(/^ACC-\d{6}$/, {
        message: `Account number must follow the pattern ACC-XXXXXX where XXXXXX is the last 6 digits of the timestamp`
    })
    accountNumber: string;

    @IsIn(["USD", "EUR", "ARS"])
    currency: BankAccount["currency"];

    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    balance: number;

    @IsIn(["enable", "disabled"])
    status: BankAccount["status"];
}


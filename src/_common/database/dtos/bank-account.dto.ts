import V from 'class-validator';
import { BankAccount } from '../entities/bank-account.entity';

export class BankAccountDto implements Pick<BankAccount, "accountNumber" | "currency" | "balance" | "status"> {

    @V.IsOptional()
    @V.IsUUID()
    id?: string;

    @V.IsString()
    @V.Matches(/^ACC-\d{6}$/, {
        message: `Account number must follow the pattern ACC-XXXXXX where XXXXXX is the last 6 digits of the timestamp`
    })
    accountNumber: string;

    @V.IsIn(["USD", "EUR", "ARS"])
    currency: BankAccount["currency"];

    @V.IsNumber()
    @V.IsDecimal({ decimal_digits: '2' })
    balance: number;

    @V.IsIn(["enable", "disabled"])
    status: BankAccount["status"];
}



import { IsDecimal, IsEnum, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { BankTransaction } from '../entities/bank-transaction.entity';

export class BankTransactionDto implements Pick<BankTransaction, "id" | "amount" | "currency" | "type" | "status"> {

    @IsOptional()
    @IsUUID()
    id: number;

    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    amount: number;

    @IsEnum(BankTransaction["currency"])
    currency: BankTransaction["currency"];

    @IsEnum(BankTransaction["type"])
    type: BankTransaction["type"];

    @IsEnum(BankTransaction["status"])
    status: BankTransaction["status"];

}
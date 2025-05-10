
import { IsDecimal, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { BankTransaction, StatusType, TransactionType, CurrencyType } from '../entities/bank-transaction.entity';

export class BankTransactionDto implements Pick<BankTransaction, "id" | "amount" | "currency" | "type" | "status"> {

    @IsOptional()
    @IsUUID()
    id: number;

    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    amount: number;

    @IsIn(CurrencyType)
    currency: BankTransaction["currency"];

    @IsIn(TransactionType)
    type: BankTransaction["type"];

    @IsIn(StatusType)
    status: BankTransaction["status"];

}
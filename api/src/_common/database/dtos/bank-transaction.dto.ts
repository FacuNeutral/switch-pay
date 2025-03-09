import V from 'class-validator';
import { BankTransaction, StatusType, TransactionType, CurrencyType } from '../entities/bank-transaction.entity';

export class BankTransactionDto implements Pick<BankTransaction, "id" | "amount" | "currency" | "type" | "status"> {

    @V.IsOptional()
    @V.IsUUID()
    id: string;

    @V.IsNumber()
    @V.IsDecimal({ decimal_digits: '2' })
    amount: number;

    @V.IsIn(CurrencyType)
    currency: BankTransaction["currency"];

    @V.IsIn(TransactionType)
    type: BankTransaction["type"];

    @V.IsIn(StatusType)
    status: BankTransaction["status"];

}
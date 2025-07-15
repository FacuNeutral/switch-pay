import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PaymentMethodType, StatusType, TransactionType } from '../interfaces/bank-transaction.interface';
import { CurrencyType } from '../interfaces/bank-account.interface';


@Entity()
export class BankTransaction {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: CurrencyType, enumName: "currency_type_enum", default: CurrencyType.USD })
    currency?: CurrencyType;

    @Column({ type: 'enum', enum: StatusType, enumName: "status_type_enum", default: StatusType.Pending })
    status: StatusType;

    @Column({ type: 'enum', enum: TransactionType, enumName: "transaction_type_enum", default: TransactionType.Transfer })
    type: TransactionType;

    @Column({ type: 'int', default: 0 })
    perkDurationInDays: number;

    @Column({ type: 'enum', enum: PaymentMethodType, enumName: "payment_method_type_enum", default: PaymentMethodType.Wallet })
    paymentMethod: PaymentMethodType;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    fee: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    //% Initial Methods & Validations

    private generateTransactionNumber = () => {
        const uuid = uuidv4();
        const numericId = BigInt('0x' + uuid.replace(/-/g, '')).toString().slice(0, 12);
        const transactionNumber = parseInt(numericId);
        this.id = transactionNumber;
    }

    @BeforeInsert()
    private beforeInsertActions() { this.generateTransactionNumber(); }

    @BeforeUpdate()
    private beforeUpdateActions() { }

    //% Relations

    @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.fromTransactions)
    fromAccount: BankAccount;

    @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.toTransactions)
    toAccount: BankAccount;

}
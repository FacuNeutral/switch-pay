import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { BadRequestException } from '@nestjs/common';

export const StatusType = ["pending", "completed", "rejected"] as const;
export const TransactionType = ["deposit", "withdrawal", "transfer"] as const;
export const CurrencyType = ["USD", "EUR", "ARS"] as const;

@Entity()
export class BankTransaction {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'text', default: "USD" })
    currency: typeof CurrencyType[number];

    @Column({ type: 'text', default: "pending" })
    status: typeof StatusType[number];

    @Column({ type: 'text', default: "transfer" })
    type: typeof TransactionType[number];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //% Transforms & Checks

    checkStatus() {
        if (!StatusType.includes(this.status))
            throw new BadRequestException(`Invalid status: ${this.status}`);
    }

    @BeforeInsert()
    beforeInsertActions() { }

    @BeforeUpdate()
    beforeUpdateActions() { }

    //% Relations

    @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.fromTransactions)
    fromAccount: BankAccount;

    @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.toTransactions)
    toAccount: BankAccount;
}

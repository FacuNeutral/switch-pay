import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { BadRequestException } from '@nestjs/common';

export const StatusType = ["pending", "completed", "rejected"] as const;
export const TransactionType = ["deposit", "withdrawal", "transfer", "perk"] as const;
export const PaymentMethodType = ["wallet", "paypal", "mercadopago"] as const;
export const CurrencyType = ["USD"] as const;

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'text', default: "USD" })
    currency?: typeof CurrencyType[number];

    @Column({ type: 'text', default: "pending" })
    status: typeof StatusType[number];

    @Column({ type: 'text', default: "transfer" })
    type: typeof TransactionType[number];

    @Column({ type: 'datetime', default: 0 })
    perkDurationInDays: number;

    @Column({ type: 'text', default: "wallet" })
    paymentMethod: typeof PaymentMethodType[number];

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    fee: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    //% Transforms & Checks

    checkStatus() {
        if (!StatusType.includes(this.status))
            throw new BadRequestException(`Invalid status: ${this.status}`);
        if (!TransactionType.includes(this.type))
            throw new BadRequestException(`Invalid type: ${this.type}`);
        if (!PaymentMethodType.includes(this.paymentMethod))
            throw new BadRequestException(`Invalid payment method: ${this.paymentMethod}`);
        if (!CurrencyType.includes(this.currency || "USD"))
            throw new BadRequestException(`Invalid currency: ${this.currency}`);
    }

    @BeforeInsert()
    beforeInsertActions() { this.checkStatus(); }

    @BeforeUpdate()
    beforeUpdateActions() { this.checkStatus(); }


    //% Relations

    @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.fromTransactions)
    fromAccount: BankAccount;

    @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.toTransactions)
    toAccount: BankAccount;

}
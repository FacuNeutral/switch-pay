import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeUpdate, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { BadRequestException } from '@nestjs/common';

export const CurrencyType = ["USD", "EUR", "ARS"] as const;
export const StatusType = ["enable", "disabled"] as const;

@Entity()
export class BankAccount {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    accountNumber: string;

    @Column({ type: 'text', default: "USD" })
    currency: typeof CurrencyType[number];

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

    @Column({ type: 'text', default: 'enable' })
    status: typeof StatusType[number];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //% Transforms & Checks

    checkCurrency() {
        const allowedCurrencies = ["USD", "EUR", "ARS"];
        if (!allowedCurrencies.includes(this.currency))
            throw new BadRequestException(`Invalid currency: ${this.currency}`);
    }
    checkStatus() {
        const allowedStatus = ["enable", "disabled"];
        if (!allowedStatus.includes(this.status))
            throw new BadRequestException(`Invalid status: ${this.status}`);
    }

    generateAccountNumber() {
        const prefix = 'ACC';
        const timestamp = Date.now().toString().slice(-6);
        this.accountNumber = `${prefix}-${timestamp}`;
    }

    @BeforeInsert()
    beforeInsertActions() {
        this.checkStatus();
        this.generateAccountNumber();
        this.checkCurrency();
    }

    @BeforeUpdate()
    beforeUpdateActions() {
        this.checkCurrency();
    }

    //% Relations

    @OneToOne(() => User, (user) => user.bankAccount)
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.fromAccount)
    fromTransactions: Transaction[];

    @OneToMany(() => Transaction, (transaction) => transaction.toAccount)
    toTransactions: Transaction[];
}
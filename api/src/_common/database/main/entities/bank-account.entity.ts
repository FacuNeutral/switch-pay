import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeUpdate, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { BankTransaction } from './bank-transaction.entity';
import { BadRequestException } from '@nestjs/common';
import { CurrencyType, AccountStatusType } from '../interfaces/bank-account.interface';

@Entity()
export class BankAccount {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'enum', enum: CurrencyType, enumName: "currency_type_enum", default: CurrencyType.USD })
    currency: CurrencyType;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

    @Column({ type: 'enum', enum: AccountStatusType, enumName: "account_status_type_enum", default: AccountStatusType.Enable })
    status: AccountStatusType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //% Initial Methods & Validations

    checkCurrency() {
        const allowedCurrencies = Object.values(CurrencyType);
        if (!allowedCurrencies.includes(this.currency))
            throw new BadRequestException(`Invalid currency: ${this.currency}`);
    }
    checkStatus() {
        const allowedStatus = Object.values(AccountStatusType);
        if (!allowedStatus.includes(this.status))
            throw new BadRequestException(`Invalid status: ${this.status}`);
    }

    @BeforeInsert()
    beforeInsertActions() {
        this.checkStatus();
        this.checkCurrency();
    }

    @BeforeUpdate()
    beforeUpdateActions() {
        this.checkCurrency();
    }

    //% Relations

    @OneToOne(() => User, (user) => user.bankAccount)
    user: User;

    @OneToMany(() => BankTransaction, (transaction) => transaction.fromAccount)
    fromTransactions: BankTransaction[];

    @OneToMany(() => BankTransaction, (transaction) => transaction.toAccount)
    toTransactions: BankTransaction[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BankAccount } from './bank-account.entity';

import { hash } from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text')
    fullName: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('text', { unique: true, nullable: true, select: false })
    phoneNumber?: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    //% Transforms & Checks

    private async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @BeforeInsert()
    async beforeInsertActions() {
        await this.hashPassword();
    }

    @BeforeUpdate()
    async beforeUpdateActions() { }

    //% Relations

    @OneToMany(() => BankAccount, (bankAccount) => bankAccount.user)
    bankAccounts: BankAccount[];

}
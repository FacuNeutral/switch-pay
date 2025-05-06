import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { BankAccount } from './bank-account.entity';

import { hash } from 'bcrypt';
import { UserSettings } from './user-settings.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text', { unique: true })
    alias: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('number', { select: false })
    pinCode?: number;

    // @Column('text', { unique: true, nullable: true, select: false })
    // phoneNumber?: string;


    @Column('text', { nullable: true })
    photo?: string;

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

    @OneToOne(() => BankAccount, (bankAccount) => bankAccount.user)
    bankAccount: BankAccount;

    @OneToOne(() => UserSettings, (settings) => settings.user, { cascade: true })
    settings: UserSettings;

}
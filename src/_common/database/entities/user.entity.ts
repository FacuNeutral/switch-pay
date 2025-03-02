import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BankAccount } from './bank-account.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text', { nullable: false })
    fullName: string;

    @Column('text', { unique: true, nullable: false })
    email: string;

    @Column('text', { nullable: false })
    password: string;

    @Column('text')
    phoneNumber?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //% Transforms & Checks

    @BeforeInsert()
    beforeInsertActions() { }

    @BeforeUpdate()
    beforeUpdateActions() { }

    //% Relations

    @OneToMany(() => BankAccount, (bankAccount) => bankAccount.user)
    bankAccounts: BankAccount[];

}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import e from 'express';
import { BadRequestException } from '@nestjs/common';

export const RegisterStepType = ["set_profile", "set_pin_code", "complete"] as const;

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    //* if you change this password, all user devices will be logged out
    @Column('uuid', { select: false })
    tokenPassword: string;


    @Column({ type: 'text', default: "set_profile" })
    registerStep: typeof RegisterStepType[number];

    @Column('text', { unique: true, nullable: true })
    alias: string;

    @Column('text', { nullable: true })
    firstName: string;

    @Column('text', { nullable: true })
    lastName: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('text', { select: false, nullable: true, default: "333111" })
    pinCode?: string;

    // @Column('text', { unique: true, nullable: true, select: false })
    // phoneNumber?: string;

    @Column('text', { nullable: true })
    profilePhoto?: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;


    //% Initial Methods & Validations

    private validateProps() {
        if (!RegisterStepType.includes(this.registerStep))
            throw new BadRequestException(`Invalid register step: ${this.registerStep}`);
    }

    private async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @BeforeInsert()
    private async beforeInsertActions() {
        this.tokenPassword = uuidv4();
        await this.hashPassword();
    }

    @BeforeUpdate()
    private async beforeUpdateActions() { this.validateProps(); }




    //% Relations

    @OneToOne(() => BankAccount, (bankAccount) => bankAccount.user)
    bankAccount: BankAccount;

}
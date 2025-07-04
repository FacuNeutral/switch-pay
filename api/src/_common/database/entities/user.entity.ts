import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import e from 'express';
import { BadRequestException } from '@nestjs/common';
import { SecurityCode } from './security-code.entity';

export enum RegisterStep {
    SetProfile = "set-profile",
    SetPinCode = "set-pin-code",
    Complete = "complete"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    //* if you change this password, all user devices will be logged out
    @Column('uuid', { select: false, default: () => `uuid_generate_v4()` })
    tokenPassword: string;

    @Column({
        type: 'enum', enum: RegisterStep, enumName: 'register_step', nullable: false,
        default: RegisterStep.SetProfile
    })
    registerStep: RegisterStep;

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

    @Column('text', { select: false, nullable: true })
    pinCode?: string;

    // @Column('text', { unique: true, nullable: true, select: false })
    // phoneNumber?: string;

    @Column('text', { nullable: true })
    profilePhoto?: string;

    //terms and conditions.
    @Column('boolean', { select: false })
    termsAndConditions: boolean;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;


    //% Initial Methods & Validations

    private validateProps() {
        if (!Object.values(RegisterStep).includes(this.registerStep))
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
    private beforeUpdateActions() {
        this.validateProps();
    }




    //% Relations

    @OneToOne(() => BankAccount, (bankAccount) => bankAccount.user)
    bankAccount: BankAccount;

    @OneToMany(() => SecurityCode, code => code.user, { cascade: true })
    securityCodes: SecurityCode[];
}
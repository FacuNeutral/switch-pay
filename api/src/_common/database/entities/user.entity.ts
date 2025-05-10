import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    //* if you change this password, all user devices will be logged out
    @Column('uuid', { select: false })
    tokenPassword: string;

    @Column('text', { unique: true, nullable: true })
    alias: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('decimal', { select: false, nullable: true })
    pinCode?: number;

    // @Column('text', { unique: true, nullable: true, select: false })
    // phoneNumber?: string;

    @Column('text', { nullable: true })
    profilePhoto?: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;


    //% Initial Methods & Validations

    private async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @BeforeInsert()
    async beforeInsertActions() {
        this.tokenPassword = uuidv4();
        await this.hashPassword();
    }

    @BeforeUpdate()
    async beforeUpdateActions() { }


    //% Relations

    @OneToOne(() => BankAccount, (bankAccount) => bankAccount.user)
    bankAccount: BankAccount;

}
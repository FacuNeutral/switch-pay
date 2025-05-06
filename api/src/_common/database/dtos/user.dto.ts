import V, { IsAlpha, IsEmail, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUUID, Length } from 'class-validator';
import { User } from '../entities/user.entity';
import { BankAccount } from '../entities/bank-account.entity';

export class UserDto implements Omit<User, "id" | "createdAt" | "updatedAt" | "bankAccounts" | "beforeInsertActions" | "beforeUpdateActions"> {

    // @IsOptional()
    // @IsUUID()
    // id?: string;

    @IsString()
    @IsAlpha()
    @Length(2, 25, {
        message({ constraints }) {
            return `Your full name must be between ${constraints[0]} and ${constraints[1]} characters long`;
        },
    })
    fullName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    password: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber('AR')
    phoneNumber?: string;


    tokenPassword: string;
    alias: string;
    firstName: string;
    lastName: string;
    pinCode?: number | undefined;
    profilePhoto?: string | undefined;
    bankAccount: BankAccount;
}


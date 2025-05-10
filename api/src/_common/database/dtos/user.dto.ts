import V, { IsAlpha, IsEmail, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUrl, IsUUID, Length, Matches, Max, MaxLength } from 'class-validator';
import { User } from '../entities/user.entity';
import { BankAccount } from '../entities/bank-account.entity';

export class UserDto implements Omit<User, "id" | "tokenPassword" | "createdAt" | "updatedAt" | "bankAccounts" | "beforeInsertActions" | "beforeUpdateActions" | "bankAccount"> {

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    password: string;

    @IsString()
    @Length(6, 20, { message: "Alias must be between 6 and 20 characters" })
    @Matches(/^[a-zA-Z0-9.-]+$/, {
        message: "Alias can only contain letters, numbers, periods, and hyphens",
    })
    @Matches(/^[^ñÑ]+$/, {
        message: "Alias cannot contain the letter 'ñ'",
    })
    alias: string;

    @IsAlpha()
    @Length(2, 30, { message: ({ constraints }) => `your "first name" must be between ${constraints[0]} and ${constraints[1]} characters` })
    firstName: string;

    @IsAlpha()
    @Length(2, 30, { message: ({ constraints }) => `your "last name" must be between ${constraints[0]} and ${constraints[1]} characters` })
    lastName: string;

    @IsString()
    @Length(6, 6, { message: "your \"pin code\" must be exactly 6 characters" })
    pinCode: number;

    @IsUrl()
    @MaxLength(100, { message: "your \"photo\" must be less than 100 characters" })
    profilePhoto: string;


    // @IsOptional()
    // @IsString()
    // @IsPhoneNumber("AR")
    // phoneNumber?: string;
}
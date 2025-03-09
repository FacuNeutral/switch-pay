import V from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDto implements Omit<User, "id" | "createdAt" | "updatedAt" | "bankAccounts" | "beforeInsertActions" | "beforeUpdateActions"> {

    @V.IsOptional()
    @V.IsUUID()
    id?: string;

    @V.IsString()
    @V.IsAlpha()
    @V.Length(2, 25, {
        message({ constraints }) {
            return `Your full name must be between ${constraints[0]} and ${constraints[1]} characters long`;
        },
    })
    fullName: string;

    @V.IsEmail()
    email: string;

    @V.IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    password: string;

    @V.IsOptional()
    @V.IsString()
    @V.IsPhoneNumber('AR')
    phoneNumber?: string;
}


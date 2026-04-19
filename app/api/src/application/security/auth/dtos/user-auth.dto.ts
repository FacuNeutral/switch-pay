
import { UserDto } from "@db/dtos";
import { PartialType, PickType } from "@nestjs/mapped-types";

export class BasicCredentialsDto extends PickType(UserDto,
    ["email", "password"])
{ }
export class CreateUserDto extends PickType(UserDto,
    ["email", "password", "termsAndConditions"])
{ }
export class UserPinCodeDto extends PickType(UserDto,
    ["pinCode"])
{ }

export class UserPasswordDto extends PickType(UserDto,
    ["password"])
{ }
export class UserEmailDto extends PickType(UserDto,
    ["email"])
{ }

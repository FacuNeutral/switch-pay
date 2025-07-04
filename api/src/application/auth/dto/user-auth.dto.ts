import { PartialType, PickType } from "@nestjs/mapped-types";
import { UserDto } from "src/_common/database/dtos/user.dto";

export class BasicCredentialsDto extends PickType(UserDto,
    ["email", "password"])
{ }
export class CreateUserDto extends PickType(UserDto,
    ["email", "password", "termsAndConditions"])
{ }
export class UserPinCodeDto extends PickType(UserDto,
    ["pinCode"])
{ }

export class UserEmailDto extends PickType(UserDto,
    ["email"])
{ }
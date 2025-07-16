import { PickType } from "@nestjs/mapped-types";
import { IsString, Length } from "class-validator";
import { UserDto } from "@db/dtos/user.dto";

export class VerifyCodeDto extends PickType(UserDto,
    ["email"])
{
    @IsString()
    @Length(6, 6, { message: "your \"pin code\" must be exactly 6 characters" })
    code: string;
}
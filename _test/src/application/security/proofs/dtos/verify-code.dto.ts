import { IntersectionType, PickType } from "@nestjs/mapped-types";
import { IsEnum, IsString, Length } from "class-validator";
import { UserDto } from "@db/dtos/user.dto";
import { UserAction } from "@db/interfaces";
import { CodeDto } from "./code.dto";

export class VerifyCodeDto extends IntersectionType(
    PickType(UserDto, ["email"]),
    PickType(CodeDto, ["code"])
)
{
    @IsEnum(UserAction, { message: "invalid user action" })
    userAction: UserAction;

}
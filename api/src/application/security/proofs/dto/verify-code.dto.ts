import { IntersectionType, PickType } from "@nestjs/mapped-types";
import { IsEnum, IsString, Length } from "class-validator";
import { UserDto } from "src/_common/database/dtos/user.dto";
import { UserAction } from "src/_common/database/interfaces/user-action.interface";
import { CodeDto } from "./code.dto";

export class VerifyCodeDto extends IntersectionType(
    PickType(UserDto, ["email"]),
    PickType(CodeDto, ["code"])
)
{
    @IsEnum(UserAction, { message: "invalid user action" })
    userAction: UserAction;

}
import { PickType } from "@nestjs/mapped-types";
import { IsEnum, IsString, Length } from "class-validator";
import { UserDto } from "@db/dtos/user.dto";
import { UserAction } from "@db/interfaces";

export class SendOttDto extends PickType(UserDto,
    ["email"])
{
    @IsEnum(UserAction, { message: "invalid user action" })
    userAction: UserAction;
}
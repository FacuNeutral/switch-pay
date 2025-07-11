import { PickType } from "@nestjs/mapped-types";
import { IsEnum, IsString, Length } from "class-validator";
import { UserDto } from "src/_common/database/dtos/user.dto";
import { UserAction } from "src/_common/database/interfaces/user-action.interface";

export class SendOttDto extends PickType(UserDto,
    ["email"])
{
    @IsEnum(UserAction, { message: "invalid user action" })
    userAction: UserAction;
}
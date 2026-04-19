import { PartialType, PickType } from "@nestjs/mapped-types";
import { UserDto } from "@db/dtos/user.dto";

export class SetUpProfileDto extends PickType(UserDto, ["alias", "firstName", "lastName", "profilePhoto"]) { }

export class SetUpPinCodeDto extends PickType(UserDto, ["pinCode"]) { }
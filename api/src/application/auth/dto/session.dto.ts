import { PartialType, PickType } from '@nestjs/mapped-types';
import { UserDto } from 'src/_common/database/dtos/user.dto';

export class SessionDto extends PickType(UserDto, ["pinCode"]) { }
import { PartialType, PickType } from '@nestjs/mapped-types';
import { UserDto } from 'src/_common/database/dtos/user.dto';

export class BasicCredentialsDto extends PickType(UserDto, ['email', 'password']) { }
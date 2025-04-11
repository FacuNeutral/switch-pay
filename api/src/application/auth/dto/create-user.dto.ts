import { PickType } from '@nestjs/mapped-types';
import { UserDto } from 'src/_common/database/dtos/user.dto';

export class CreateUserDto extends PickType(UserDto, ['fullName', 'email', 'password']) { }
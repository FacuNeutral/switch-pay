import { BadRequestException, ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AutoLogErrors, SkipAutoLog } from 'src/_common/config/loggers/auto-log-errors.decorator';

import { User } from '@db/entities/user.entity';
import { UserDao } from '@db/dao/user.dao';
import { CreateUserDto } from '@auth/dtos/user-auth.dto';

@Injectable()
@AutoLogErrors()
export class UserManagerService {

    private readonly logger = new Logger(UserManagerService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userDao: UserDao,
    ) { }


    async createUser(createUserDto: CreateUserDto) {
        if (!createUserDto.termsAndConditions)
            throw new BadRequestException("You must accept the terms and conditions");

        const newUser = await this.userDao.create(createUserDto);

        return this.sanitizeUser(newUser);
    }

    private sanitizeUser(user: User) {
        //* Remove sensitive properties
        const sanitizedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePhoto: user.profilePhoto,
        }

        return sanitizedUser;
    }

    //% Errors management

    @SkipAutoLog()
    private async handleException(error: any) {
        if (error.code === "SQLITE_CONSTRAINT")
            if (error.message.includes("UNIQUE constraint failed: user.email"))
                throw new BadRequestException("email already exists");

        throw error;
        // throw new InternalServerErrorException("Internal Server Error");

    }

}

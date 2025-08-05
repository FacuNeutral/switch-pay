import { BadRequestException, ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AutoLogErrors, SkipAutoLog } from 'src/_common/config/loggers/auto-log-errors.decorator';
import * as bcrypt from "bcrypt";
import { SetUpProfileDto } from './dtos/set-up.dto';
import { RegisterStep, User } from '@db/entities/user.entity';
import { UserDao } from '@db/dao/user.dao';
import { CreateUserDto } from '@auth/dtos/user-auth.dto';

@Injectable()
@AutoLogErrors()
export class UsersService {

    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userDao: UserDao,
        // @Inject("USER_REFRESH_TOKEN")
        // private readonly refreshTokenService: JwtService,
        // @Inject("USER_ACCESS_TOKEN")
        // private readonly accessTokenService: JwtService,
    ) { }


    async createUser(createUserDto: CreateUserDto) {
        if (!createUserDto.termsAndConditions)
            throw new BadRequestException("You must accept the terms and conditions");

        const newUser = await this.userDao.create(createUserDto);

        return this.sanitizeUser(newUser);
    }

    async setUpProfile(userId: string, setUpProfileDto: SetUpProfileDto) {

        await this.userDao.update(userId, setUpProfileDto)
            .onAfterLoad(async (db_user, user) => {
                if (db_user.registerStep !== RegisterStep.SetProfile)
                    throw new ConflictException("profile already set up");

                user.registerStep = RegisterStep.SetPinCode;
            })
            .save();

        this.logger.log(`User "ID: ${userId}" profile set up successfully`);

    }

    async setUpPinCode(userId: string, pinCode: string) {
        const hashPinCode = await bcrypt.hash(pinCode, 10);

        await this.userDao.update(userId, { pinCode: hashPinCode })
            .onAfterLoad(async (db_user, user) => {
                if (db_user.registerStep === RegisterStep.SetProfile)
                    throw new ConflictException("first set up your profile");

                if (db_user.registerStep !== RegisterStep.SetPinCode)
                    throw new ConflictException("pin code already set up");

                user.registerStep = RegisterStep.Complete;
            })
            .save();

        this.logger.log(`User "ID: ${userId}" pin code set up successfully`);
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

    // async createUser(createUserDto: CreateUserDto) {
    //     if (createUserDto.termsAndConditions !== true)
    //       throw new BadRequestException("You must accept the terms and conditions");

    //     try {

    //       const newUser = this.userRepository.create(createUserDto);
    //       await this.userRepository.save(createUserDto);

    //       return this.sanitizeUser(newUser);

    //     } catch (error) { await this.handleException(error) }

    //   }

    //   async loginUser(basicCredentialsDto: BasicCredentialsDto) {
    //     const db_user = await this.checkUserCredentials(basicCredentialsDto);
    //     const { password: removedPassword, pinCode: removedPinCode,
    //       ...result } = db_user;
    //     const token = this.refreshTokenService.sign(result);

    //     this.logger.log(`user "ID: ${db_user.id}" logged in successfully`);

    //     return { ...result, token };
    //   }


    //   async createUserSession(id: string, pinCode: string) {
    //     const userAuthenticated = await this.checkPinCode(id, pinCode);
    //     const { password: removedPassword, pinCode: removedPinCode,
    //       ...result } = userAuthenticated;
    //     const token = this.accessTokenService.sign(result);

    //     this.logger.log(`user "ID: ${userAuthenticated.id}" session started successfully`);

    //     return { ...result, token };
    //   }

    //   async obtainUserRegisterStep(id: string): Promise<string> {
    //     const db_user = await this.userRepository.findOneBy({ id });
    //     if (!db_user) throw new NotFoundException("user not found");

    //     this.logger.log(`user "ID: ${db_user.id}" register step obtained`);

    //     return db_user.registerStep;
    //   }

    //   private sanitizeUser(user: User) {
    //     //* Remove sensitive properties
    //     const sanitizedUser = {
    //       firstName: user.firstName,
    //       lastName: user.lastName,
    //       email: user.email,
    //       profilePhoto: user.profilePhoto,
    //     }

    //     return sanitizedUser;
    //   }

    //   private async checkUserCredentials({ email, password }: BasicCredentialsDto): Promise<User> {

    //     const db_user = await this.userRepository.createQueryBuilder("user")
    //       .addSelect(["user.password", "user.pinCode"])
    //       .where("email = :email", { email })
    //       .getOne();

    //     if (!db_user) throw new UnauthorizedException("invalid credentials");

    //     const checkPassword = await bcrypt.compare(password, db_user.password);

    //     if (!checkPassword) throw new UnauthorizedException("invalid credentials");

    //     this.logger.log("checked credentials successfully");

    //     return db_user;
    //   }

    //   private async checkPinCode(id: string, pinCode: string): Promise<User> {
    //     const db_user = await this.userRepository.createQueryBuilder("user")
    //       .addSelect(["user.password", "user.pinCode"])
    //       .where("id = :id", { id })
    //       .getOne();

    //     if (!db_user) throw new UnauthorizedException("invalid credentials");

    //     if (db_user.pinCode !== pinCode)
    //       throw new BadRequestException("pincode is invalid");

    //     this.logger.log("pincode validated successfully");

    //     return db_user;
    //   }


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

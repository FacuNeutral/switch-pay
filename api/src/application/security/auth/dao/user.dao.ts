import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoLogErrors } from "src/_common/config/loggers/auto-log-errors.decorator";
import { UserDto } from "src/_common/database/dtos/user.dto";
import { User } from "src/_common/database/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/application/security/auth/dto/user-auth.dto";
import { log } from "console";
import { UpdateQueryBuilder } from "src/_common/database/dao/query-builders/update-query-builder";

@Injectable()
export class UserDao {

    private readonly logger = new Logger(UserDao.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    //% Basic operations
    async getById(id: string): Promise<User> {
        try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) throw new BadRequestException('user not found');

            this.logger.log(`User ID ${id} retrieved`);

            return user;

        } catch (error) {
            throw await this.handleException(error);
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOneBy({ email });
            if (!user) throw new BadRequestException('user email not found');

            this.logger.log(`User with email ${email} retrieved`);

            return user;

        } catch (error) {
            throw await this.handleException(error);
        }
    }

    async saveUpdatedUser(user: Partial<UserDto>): Promise<User> {
        const updatedUser = await this.userRepository.save(user);
        this.logger.log(`User ID ${updatedUser.id} updated successfully`);

        return updatedUser;
    }



    async create(user: CreateUserDto) {
        try {
            
            const user_db = await this.userRepository.findOneBy({
                email: user.email
            });
            if (user_db) throw new ConflictException("user already exists with this email");

            const newUser = this.userRepository.create(user);
            await this.userRepository.save(newUser);

            this.logger.log(`User ID ${newUser.id} created successfully`);

            return newUser;

        } catch (error) {
            throw await this.handleException(error);
        }
    }

    private async handleException(error: any) {

        if (error.code === "23505")
            throw new ConflictException("user already exists");

        if (error.code === "22P02")
            throw new ConflictException("invalid User ID format");

        if (error instanceof HttpException) throw error;

        this.logger.error(`Internal error: ${error.message}`);
        throw new InternalServerErrorException("an unexpected error occurred while processing the request");

    }
}
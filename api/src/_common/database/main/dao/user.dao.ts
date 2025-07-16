import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseDao } from "./base/base-dao";
import { User } from "@db/entities";
import { CreateUserDto } from "@auth/dtos/user-auth.dto";

@Injectable()
export class UserDao extends BaseDao<User> {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { super(userRepository) }

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
        this.delete
        this.logger.error(`Internal error: ${error.message}`);
        throw new InternalServerErrorException("an unexpected error occurred while processing the request");

    }
}
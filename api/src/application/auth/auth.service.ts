import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/_common/dtos/pagination.dto';
import { User } from 'src/_common/database/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async createUser(body: any) {
    const user = this.userRepository.create(body);
    return await this.userRepository.save(user);
  }
}

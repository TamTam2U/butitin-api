import { BadRequestException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/app/entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof user,
  ) {}

  async findAll(): Promise<user[]> {
    return await this.userRepository.findAll<user>();
  }

  async findOne(id: number): Promise<user> {
    let user = await this.userRepository.findByPk(id)
    if(user){
      return user
    }else{
      throw new NotFoundException
    }
  }

  async findOneByEmail(email: string): Promise<user> {
    return await this.userRepository.findOne({ where: { email: email ,deleteAt: null} });
  }

  async create(userNew : CreateUserDto):Promise<user>{
    return await this.userRepository.create(userNew);
  }
}

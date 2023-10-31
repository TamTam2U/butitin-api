import { Inject, Injectable } from '@nestjs/common';
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
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOneByEmail(email: string): Promise<user> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async create(userNew : CreateUserDto):Promise<user>{
    // let newUser = new user()
    // for(const key in userNew){
    //   newUser[key] = userNew[key]
    // }
    return await this.userRepository.create(userNew);
  }
}

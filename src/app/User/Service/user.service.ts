import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { user } from 'src/app/entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { EmailUserDto } from '../dtos/FindUserByEmail.dto';
import { User } from 'src/app/entity/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ where: { deleteAt: null } });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOneByEmail(email: EmailUserDto): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email.email },
    });
  }

  async create(userNew: CreateUserDto): Promise<User> {
    const user = new User();
    for (const key in userNew) {
      user[key] = userNew[key];
    }
    return await this.userRepository.save(user);
  }
}

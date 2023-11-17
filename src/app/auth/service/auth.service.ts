import {
  BadRequestException,
  ClassSerializerInterceptor,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Exclude } from 'class-transformer';
import { UserService } from 'src/app/User/Service/user.service';
import { CreateUserDto } from 'src/app/User/dtos/CreateUser.dto';
// import { user } from 'src/app/entity';
import { RegisterDto } from '../dtos/Register.dto';
import { ValidationFailed } from 'sequelize-typescript';
import { NewPasswordDto } from '../dtos/NewPassword.dto';
import { EmailUserDto } from 'src/app/User/dtos/FindUserByEmail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/entity/User';
import * as otpGenerator from 'otp-generator';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    const payload = {
      sub: {
        id: user.id,
      },
      email: user.email,
      status: user.status,
    };
    if (user && user.password === password) {
      return {
        status: 200,
        data: {
          access_token: this.jwtService.sign(payload, {
            expiresIn: '1d',
          }),
          refresh_token: this.jwtService.sign(payload, { expiresIn: '2d' }),
        },
        message: 'login success',
        error: [],
      };
    } else {
      throw new BadRequestException('Invalid email or password');
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(userNew: RegisterDto): Promise<User | any> {
    try {
      const user = new User();
      user.otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      user.createAt = new Date();
      user.status = 'user';
      for (const key in userNew) {
        user[key] = userNew[key];
      }
      if (await this.userRepository.save(user)) {
        return user;
      } else {
        return false;
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getOtp(id: string): Promise<any> {
    const user = await this.UserService.findOne(id);
    let response = {
      id: user.id,
      email: user.email,
      otp: user.otp,
    };
    if (user) {
      return response;
    } else {
      return false;
    }
  }

  async verifyOtp(id: string, otp: string): Promise<any> {
    const user = await this.UserService.findOne(id);
    if (user) {
      if (user.otp === otp) {
        return {
          status: 200,
          message: 'otp verified',
          data: [],
          error: [],
        };
      } else {
        return {
          status: 400,
          message: 'otp not verified',
          data: [],
          error: [],
        };
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async newPassword(id: string, newPassword: string): Promise<User | any> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      if (user.password === newPassword) {
        throw new BadRequestException(
          'Kata sandi baru tidak boleh sama dengan kata sandi lama',
        );
      }
      try {
        user.password = newPassword;
        user.updateAt = new Date().toISOString();
        if(await this.userRepository.save(user)){
          return user
        }
      } catch (error) {
        throw new Error('Gagal memperbarui kata sandi');
      }
    } else {
      throw new NotFoundException('User tidak ditemukan');
    }
  }


}

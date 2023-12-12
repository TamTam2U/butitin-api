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
import { RefreshTokenDto } from '../dtos/RefreshToken.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private UserService: UserService,
    private jwtService: JwtService,
    private readonly mailService : MailerService
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if(user.status === 'admin' || user.status === 'owner'){
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
          id: user.id,
          error: [],
        };
      } else {
        throw new BadRequestException('Invalid email or password');
      }
    }else{
      return {
        status: 400,
        message: 'Anda bukan Admin Atau Owner'
      };
    }
  }

  async loginUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user.status === 'user'){
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
          id: user.id,
          error: [],
        };
      } else {
        throw new BadRequestException('Invalid email or password');
      }
    }else{
      return {
        status: 400,
        message: 'Anda bukan User'
      };
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

  async getOtp(email: EmailUserDto): Promise<any> {
    const user = await this.UserService.findOneByEmail(email);
    let response = {
      id: user.id,
      email: user.email,
      otp: user.otp,
    };
    if (user) {
      this.mailService
        .sendMail({
          to: user.email,
          subject: 'Butitin - OTP Verification',
          html: 'OTP: ' + user.otp,
        })
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
        user.otp = otpGenerator.generate(6, {
          digits: true,
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        user.password = newPassword;
        user.updateAt = new Date().toISOString();
        if (await this.userRepository.save(user)) {
          const response = {
            status: 200,
            message: 'Password Berhasil Reset',
            data: [],
            error: [],
          }
          return response;
        }
      } catch (error) {
        throw new Error('Gagal memperbarui kata sandi');
      }
    } else {
      throw new NotFoundException('User tidak ditemukan');
    }
  }

  async refreshToken(refreshToken: RefreshTokenDto): Promise<any> {
    try {
      const decode = await this.jwtService.verify(refreshToken.refresh_token);
      const payload = {
        sub: {
          id: decode.sub.id,
        },
        email: decode.email,
        status: decode.status,
      };
      return {
        status: 200,
        data: {
          access_token: this.jwtService.sign(payload, {
            expiresIn: '1d',
          }),
        },
        message: 'login success',
        error: [],
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

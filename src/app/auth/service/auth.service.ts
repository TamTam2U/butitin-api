import {
  ClassSerializerInterceptor,
  Inject,
  Injectable,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Exclude } from 'class-transformer';
import { UserService } from 'src/app/User/Service/user.service';
import { CreateUserDto } from 'src/app/User/dtos/CreateUser.dto';
import { user } from 'src/app/entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof user,
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email, deleteAt: null }});
    const payload = { sub: user.id, email: user.email ,status: user.status};
    if (user && user.password === password) {
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
        }),
        refresh_token: await this.jwtService.sign(payload, { expiresIn: '2d' }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async register(userNew:CreateUserDto):Promise<user>{
    return await this.UserService.create(userNew);
  }

  async getOtp(id: number): Promise<any> {
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

  async verifyOtp(id: number, otp: string): Promise<any> {
    const user = await this.UserService.findOne(id);
    if (user) {
      if (user.otp === otp) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

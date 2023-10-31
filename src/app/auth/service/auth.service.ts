import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/app/User/Service/user.service';
import { user } from 'src/app/entity';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_REPOSITORY')private userRepository: typeof user,private UserService : UserService) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getOtp(id: number): Promise<any> {
    const user = await this.UserService.findOne(id);
    let response = {
      id: user.id,
      email: user.email,
      otp: user.otp
    }
    if (user) {
      return response;
    }else {
        return false;
    }
  }

  async verifyOtp(id: number, otp: string): Promise<any> {
    const user = await this.UserService.findOne(id);
    if(user){
      if(user.otp === otp){
        return true
      }else{
        return false
      }
    }else{
        return false
    }
  }
}

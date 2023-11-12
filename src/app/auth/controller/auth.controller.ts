import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { loginDto } from '../dtos/Login.dto';
import { VerifyOtpDto } from '../dtos/VerifyOtp.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/Register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(@Body() loginDto: loginDto): Promise<any> {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('/otp/:id')
  async getOtp(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.authService.getOtp(id);
  }

  @Post('/verify/:id')
  async verifyOtp(
    @Param('id', ParseIntPipe) id: number,
    @Body() verifyOtp: VerifyOtpDto,
  ): Promise<any> {
    return await this.authService.verifyOtp(id, verifyOtp.otp);
  }

  @Post('/register')
  async register(@Body() userNew: RegisterDto): Promise<any> {
    try {
      const user = await this.authService.register(userNew);
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

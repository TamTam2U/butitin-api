import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { loginDto } from '../dtos/Login.dto';
import { VerifyOtpDto } from '../dtos/VerifyOtp.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/Register.dto';
import { NewPasswordDto } from '../dtos/NewPassword.dto';
import { LocalGuard } from 'src/app/guards/local.guard';
import { RefreshTokenDto } from '../dtos/RefreshToken.dto';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Body() loginDto: loginDto, @Req() req): Promise<any> {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('/otp/:id')
  async getOtp(@Param('id', ParseIntPipe) id: string): Promise<any> {
    return await this.authService.getOtp(id);
  }

  @Post('/verify/:id')
  async verifyOtp(
    @Param('id', ParseIntPipe) id: string,
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
      throw new err();
    }
  }

  @Post('/newPassword')
  async newPassword(@Body() newPassword: NewPasswordDto): Promise<any> {
    return await this.authService.newPassword(
      newPassword.id,
      newPassword.password,
    );
  }

  @Post('/refreshToken')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }
}

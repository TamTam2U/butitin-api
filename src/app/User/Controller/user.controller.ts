import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmailUserDto } from '../dtos/FindUserByEmail.dto';
import { JwtGuard } from 'src/app/guards/jwt.guard';
import { User } from 'src/app/entity/user';

@ApiTags('User')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOkResponse({
    status: 200,
    description: 'Get all user',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Get('/all')
  async findAll(@Req() req): Promise<User[]> {
    console.log(req.user.id);
    return await this.userService.findAll();
  }
  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Post('/create')
  async create(@Body() userNew: CreateUserDto): Promise<User> {
    userNew.createAt = new Date().toISOString();
    userNew.otp = '654333';
    return await this.userService.create(userNew);
  }

  @Post('/findByEmail')
  async findByEmail(@Body() email: EmailUserDto): Promise<User> {
    return await this.userService.findOneByEmail(email);
  }
}

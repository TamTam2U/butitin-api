import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { user } from 'src/app/entity';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
        
    }
    @ApiOkResponse({
        status: 200,
        description: 'Get all user',
    })
    @Get('/all')
    async findAll(){
        return await this.userService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id',ParseIntPipe) id: number){
        return await this.userService.findOne(id);
    }

    @Post('/create')
    async create(@Body() userNew:CreateUserDto):Promise<user>{
        userNew.createAt = new Date().toISOString()
        userNew.otp = '654333'
        return await this.userService.create(userNew)
    }
}

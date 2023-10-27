import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { ApiOkResponse } from '@nestjs/swagger';

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

    
}

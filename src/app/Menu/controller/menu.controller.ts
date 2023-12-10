import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from '../Service/menu.service';
import { CreateItemDto } from '../dtos/CreateItemdto';
import { CreateCategoryDto } from '../dtos/CreateCategory.dto';
import { EditCategoryDto } from '../dtos/EditCategory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/app/guards/jwt.guard';
import { Int32 } from 'typeorm';
import { EditItemDto } from '../dtos/EditItem.dto';

@ApiTags('Menu')
@Controller('/api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/allItem')
  async findAllItem() {
    return await this.menuService.findAllItem();
  }

  @Get('/allCategory')
  async findAllCategory() {
    return await this.menuService.findAllCategory();
  }

  @Get('/oneItem/:id')
  async findOneItem(@Param('id', ParseIntPipe) id: string) {
    return await this.menuService.findOneItem(id);
  }

  @Get('/oneCategory/:id')
  async findOneCategory(@Param('id') id: string) {
    return await this.menuService.findOneCategory(id);
  }

  @Get('/oneItemByCategoryId/:id')
  async findAllItemByCategoryId(id: string): Promise<any> {
    return await this.menuService.findAllItemByCategoryId(id);
  }

  @Get('/allItemMakanan')
  async findAllItemMakanan() {
    return await this.menuService.findAllItemMakanan();
  }

  @Get('/allItemMinuman')
  async findAllItemMinuman() {
    return await this.menuService.findAllItemMinuman();
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Post('/createItem')
  async createItem(@Body() newItem: CreateItemDto, @Req() req) {
    if (req.user.status === 'owner' || req.user.status === 'admin') {
      return await this.menuService.createItem(newItem);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Put('/editItem/:id')
  async editItem(
    @Param('id') id: string,
    @Body() editItem: EditItemDto,
    @Req() req,
  ) {
    if (req.user.status === 'owner' || req.user.status === 'admin') {
      return await this.menuService.editItem(id, editItem);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Put('/deleteItem/:id')
  async deleteItem(@Param('id') id: string, @Req() req) {
    if (req.user.status === 'owner' || req.user.status === 'admin') {
      return await this.menuService.deleteItem(id);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Post('/createCategory')
  async createCategory(@Body() newCategory: CreateCategoryDto, @Req() req) {
    if (req.user.status === 'owner' || req.user.status === 'admin') {
      return await this.menuService.createCategory(newCategory);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Put('/editCategory/:id')
  async editCategory(
    @Param('id') id: string,
    @Body() editCategory: EditCategoryDto,
    @Req() req,
  ) {
    if (req.user.status === 'owner' || req.user.status === 'admin') {
      return await this.menuService.editCategory(id, editCategory);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @Delete('/deleteCategory/:id')
  async deleteCategory(@Param('id') id: string, @Req() req) {
    if (req.user.status === 'owner' || req.user.status === 'admin') {
      return await this.menuService.deleteCategory(id);
    } else {
      return {
        status: 401,
        message: 'Anda Tidak Memiliki Akses',
      };
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MenuService } from '../Service/menu.service';
import { CreateItemDto } from '../dtos/CreateMenu.dto';
import { category, item } from 'src/app/entity';
import { CreateCategoryDto } from '../dtos/CreateCategory.dto';
import { EditCategoryDto } from '../dtos/EditCategory.dto';

@Controller('menu')
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
  async findOneItem(@Param('id', ParseIntPipe) id: number) {
    return await this.menuService.findOneItem(id);
  }

  @Get('/oneCategory/:id')
  async findOneCategory(id: number) {
    return await this.menuService.findOneCategory(id);
  }

  @Post('/createItem')
  async createItem(@Body() itemNew: CreateItemDto): Promise<item> {
    return await this.menuService.createItem(itemNew);
  }

  @Put('/editItem/:id')
  async editItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() itemNew: CreateItemDto,
  ): Promise<item | undefined> {
    return await this.menuService.editItem(id, itemNew);
  }

  @Delete('/deleteItem/:id')
  async deleteItem(@Param('id', ParseIntPipe) id: number) {
    return await this.menuService.deleteItem(id);
  }

  @Post('/createCategory')
  async createCategory(
    @Body() categoryNew: CreateCategoryDto,
  ): Promise<category> {
    return await this.menuService.createCategory(categoryNew);
  }

  @Put('/editCategory/:id')
  async editCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryNew: EditCategoryDto,
  ): Promise<category | undefined> {
    return await this.menuService.editCategory(id, categoryNew);
  }

  @Delete('/deleteCategory/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.menuService.deleteCategory(id);
  }

  @Get('/itemByCategory/:id')
  async itemByCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.menuService.getItemByCategory(id);
  }
}

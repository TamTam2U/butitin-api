import { Inject, Injectable } from '@nestjs/common';
import { category, item } from 'src/app/entity';
import { CreateItemDto } from '../dtos/CreateMenu.dto';
import { CreateCategoryDto } from '../dtos/CreateCategory.dto';
import { EditCategoryDto } from '../dtos/EditCategory.dto';
import { CATCH_WATERMARK } from '@nestjs/common/constants';

@Injectable()
export class MenuService {
  constructor(
    @Inject('ITEM_REPOSITORY') private readonly itemRepository: typeof item,
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: typeof category,
  ) {}

  async findAllItem(): Promise<item[]> {
    return await this.itemRepository.findAll<item>();
  }

  async findAllCategory(): Promise<category[]> {
    return await this.categoryRepository.findAll<category>();
  }

  async findOneItem(id: number): Promise<item> {
    return await this.itemRepository.findOne({ where: { id: id } });
  }

  async findOneCategory(id: number): Promise<category> {
    return await this.categoryRepository.findOne({ where: { id: id } });
  }

  async createItem(itemNew: CreateItemDto): Promise<item> {
    return await this.itemRepository.create(itemNew);
  }

  async editItem(
    id: number,
    itemNew: CreateItemDto,
  ): Promise<item | undefined> {
    try {
      const [affectedCount] = await this.itemRepository.update(itemNew, {
        where: { id: id },
      });
      if (affectedCount > 0) {
        const updatedItem = await this.itemRepository.findByPk(id);
        return updatedItem;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }

  async deleteItem(id: number) {
    try {
      const itemToDelete = await this.itemRepository.findByPk(id);

      if (itemToDelete) {
        await itemToDelete.destroy();
        return itemToDelete;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }

  async createCategory(categoryNew: CreateCategoryDto): Promise<category> {
    return await this.categoryRepository.create(categoryNew);
  }

  async editCategory(
    id: number,
    categoryNew: EditCategoryDto,
  ): Promise<category | undefined> {
    try {
      const [affectedCount] = await this.categoryRepository.update(
        categoryNew,
        {
          where: { id: id },
        },
      );

      if (affectedCount > 0) {
        const updatedCategory = await this.categoryRepository.findByPk(
          categoryNew.id,
        );
        return updatedCategory;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      const categoryToDelete = await this.categoryRepository.findByPk(id);
      if (categoryToDelete) {
        await categoryToDelete.destroy();
        return categoryToDelete;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async getItemByCategory(id: number): Promise<item[]> {
    return await this.itemRepository.findAll<item>({
      where: { categoryId: id },
    });
  }
}

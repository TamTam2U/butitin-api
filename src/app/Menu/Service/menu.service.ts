import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { category, item } from 'src/app/entity';
import { CreateItemDto } from '../dtos/CreateItemdto';
import { CreateCategoryDto } from '../dtos/CreateCategory.dto';
import { EditCategoryDto } from '../dtos/EditCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/app/entity/Category';
import { Repository } from 'typeorm';
import { Item } from 'src/app/entity/Item';
import { isElementAccessExpression } from 'typescript';
import { EditItemDto } from '../dtos/EditItem.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async findAllItem(): Promise<Item[]> {
    return await this.itemRepository.find({ where: { deleteAt: null } });
  }

  async findAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find({ where: { deleteAt: null } });
  }

  async findOneItem(id: string): Promise<Item | any> {
    const item = await this.itemRepository.findOne({
      where: { id: id, deleteAt: null },
    });
    if (item) {
      return item;
    } else {
      throw new NotFoundException('Item Tidak Ditemukan');
    }
  }

  async findOneCategory(id: string): Promise<Category | any> {
    const category = await this.categoryRepository.findOne({
      where: { id: id, deleteAt: null },
    });
    if (category) {
      return category;
    } else {
      throw new NotFoundException('Category Tidak Ditemukan');
    }
  }

  async findAllItemByCategoryId(id: string): Promise<Item | any> {
    const category = await this.categoryRepository.findOne({
      where: { id: id, deleteAt: null },
    });
    if (category) {
      return await this.itemRepository.find({
        where: { categoryId: id, deleteAt: null },
      });
    } else {
      throw new NotFoundException('Category Tidak Ditemukan');
    }
  }

  async createItem(newItem: CreateItemDto): Promise<Item | any> {
    try {
      const item = new Item();
      item.createAt = new Date();
      const categoryId = await this.categoryRepository.findOne({
        where: { id: newItem.categoryId, deleteAt: null },
      });
      const cek = await this.itemRepository.findOne({
        where: { name: newItem.name },
      });
      if (cek) {
        return {
          status: 402,
          message: 'Item sudah ada',
        };
      }
      if (!categoryId) {
        return {
          status: 404,
          message: 'Kategori Tidak Ditemukan',
        };
      } else {
        item.category = categoryId;
      }
      for (const key in newItem) {
        item[key] = newItem[key];
      }
      if (await this.itemRepository.save(item)) {
        return item;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async editItem(id: string, editItem: EditItemDto): Promise<Item | any> {
    const item = await this.itemRepository.findOne({
      where: { id: id, deleteAt: null },
    });
    if (!item) {
      throw new NotFoundException('Item Tidak Ditemukan');
    } else {
      try {
        for (const key in editItem) {
          item[key] = editItem[key];
          item.updateAt = new Date();
        }
        if (await this.itemRepository.save(item)) {
          return item;
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  async deleteItem(id: string): Promise<any> {
    const item = await this.itemRepository.findOne({
      where: { id: id, deleteAt: null },
    });
    if (item) {
      if (await this.itemRepository.softDelete(id)) {
        return item;
      } else {
        throw new Error('Gagal Menghapus Item');
      }
    } else {
      throw new NotFoundException('Item Tidak Ditemukan');
    }
  }

  async createCategory(
    newCategory: CreateCategoryDto,
  ): Promise<Category | any> {
    try {
      const cek = await this.categoryRepository.findOne({
        where: { name: newCategory.name, deleteAt: null },
      });
      if (cek) {
        return {
          status: 402,
          message: 'Kategori Sudah Ada',
        };
      } else {
        const category = new Category();
        category.createAt = new Date();
        for (const key in newCategory) {
          category[key] = newCategory[key];
        }
        if (await this.categoryRepository.save(category)) {
          return category;
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async editCategory(
    id: string,
    editCategory: EditCategoryDto,
  ): Promise<Category | any> {
    const category = await this.categoryRepository.findOne({
      where: { id: id, deleteAt: null },
    });
    if (!category) {
      throw new NotFoundException('Category Tidak Ditemukan');
    } else {
      try {
        for (const key in editCategory) {
          category[key] = editCategory[key];
          category.updateAt = new Date();
        }
        if (await this.categoryRepository.save(category)) {
          return category;
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  async deleteCategory(id: string): Promise<any> {
    const category = await this.categoryRepository.findOne({
      where: { id: id, deleteAt: null },
    });
    if (category) {
      if (await this.categoryRepository.softDelete(id)) {
        return category;
      } else {
        throw new Error('Gagal Menghapus Category');
      }
    } else {
      throw new NotFoundException('Category Tidak Ditemukan');
    }
  }
}

/*
 * @Author: 王鑫
 * @Description: 分类实例
 * @Date: 2022-05-17 14:04:31
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(name: string) {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });
    if (category) throw new HttpException('分类已存在', HttpStatus.BAD_REQUEST);
    return await this.categoryRepository.save({ name });
  }

  async findById(id) {
    return await this.categoryRepository.findOne(id);
  }

  async findAll() {
    const list = await this.categoryRepository
      .createQueryBuilder('category')
      .where('1 = 1')
      .getMany();
    return list;
  }

  async list(listData: { page: number; pageSize: number }) {
    const { page, pageSize } = listData;
    const list = await this.categoryRepository.createQueryBuilder('category');
    list
      .orderBy('category.createTime', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);
    const result = await list.getMany();
    const total = await list.getCount();
    const count = Math.ceil(total / pageSize);

    const data = {
      list: result,
      total: total,
      count: count,
      page: Number(page),
      pageSize: Number(pageSize),
    };

    return data;
  }
}

/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-05-17 13:35:18
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(name) {
    const tag = await this.tagRepository.findOne({
      where: { name },
    });
    if (tag) throw new HttpException('标签已存在', HttpStatus.BAD_REQUEST);
    return await this.tagRepository.save({ name });
  }

  async findByIds(ids: string[]) {
    return this.tagRepository.findByIds(ids);
  }

  async findAll() {
    const list = await this.tagRepository
      .createQueryBuilder('tag')
      .where('1 = 1')
      .getMany();
    return list;
  }

  async list(listData: { page: number; pageSize: number }) {
    const { page, pageSize } = listData;
    const list = await this.tagRepository.createQueryBuilder('tag');
    list
      .orderBy('tag.createTime', 'DESC')
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

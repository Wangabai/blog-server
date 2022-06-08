/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-05-17 14:04:31
 */
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../article/entities/article.entity';

@Entity('category')
export class Category {
  @ApiProperty({ description: '分类id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '分类名称' })
  @Column()
  name: string;

  @OneToMany(() => Article, (article) => article.category)
  articles: Array<Article>;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
    name: 'create_time',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
    name: 'update_time',
  })
  updateTime: Date;
}

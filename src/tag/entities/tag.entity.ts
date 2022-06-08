/*
 * @Author: 王鑫
 * @Description: 标签实例
 * @Date: 2022-05-17 13:35:18
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../article/entities/article.entity';

@Entity('tag')
export class Tag {
  @ApiProperty({ description: '标签id' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '标签' })
  @Column()
  name: string; // 标签

  @ManyToMany(() => Article, (article) => article.tags)
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

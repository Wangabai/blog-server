/*
 * @Author: 王鑫
 * @Description: 博客实体
 * @Date: 2022-04-13 11:18:55
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('article')
export class Article {
  @ApiProperty({ description: '博客id' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '作者' })
  @Column()
  articleName: string; // 作者

  @ApiProperty({ description: '作者' })
  @Column()
  author: string; // 作者

  @ApiProperty({ description: '博客类型' })
  @Column()
  type: number; // 博客类型

  @ApiProperty({ description: '博客内容' })
  @Column('longtext')
  content: string; //博客内容

  @ApiProperty({ description: '赞数' })
  @Column()
  like: number; // 赞

  @ApiProperty({ description: '访问数' })
  @Column()
  access: number; // 访问

  @ApiProperty({ description: '创建时间' })
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
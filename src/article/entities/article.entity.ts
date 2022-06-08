/*
 * @Author: 王鑫
 * @Description: 文章实体
 * @Date: 2022-04-13 11:18:55
 */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Category } from '../../category/entities/category.entity';
import { Tag } from '../../tag/entities/tag.entity';
// import { ArticleInfoDto } from '../dto/create-article.dto';
@Entity('article')
export class Article {
  @ApiProperty({ description: '文章id' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '标题' })
  @Column()
  articleName: string; // 标题

  @ApiProperty({ description: '文章内容' })
  @Column('longtext')
  content: string; //文章内容

  @ApiProperty({ description: '文章内容html' })
  @Column('longtext')
  htmlContent: string; //文章内容

  @ApiProperty({ description: '文章简介' })
  @Column()
  intro: string; //文章简介

  @Column({ default: null, name: 'cover_url' })
  coverUrl: string; // 封面图

  @ApiProperty({ description: '赞数' })
  @Column({ default: 0 })
  like: number; // 赞

  @ApiProperty({ description: '访问数' })
  @Column({ default: 0 })
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

  @ApiProperty({ description: '是否删除（0否，1是）' })
  @Exclude()
  @Column({ default: 0 })
  isDeleted: number; // 删除

  // 分类
  // 分类
  @Exclude()
  @ManyToOne(() => Category, (category) => category.articles)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // 标签
  @ManyToMany(() => Tag, (tag) => tag.articles)
  @JoinTable({
    name: 'article_tag',
    joinColumns: [{ name: 'article_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }],
  })
  tags: Tag[];

  // toResponseObject(): ArticleInfoDto {
  //   const responseObj: ArticleInfoDto = {
  //     ...this,
  //   };
  //   if (this.category) {
  //     responseObj.category = this.category.name;
  //   }
  //   if (this.tags && this.tags.length) {
  //     responseObj.tags = this.tags.map((item) => item.name);
  //   }
  //   return responseObj;
  // }
}

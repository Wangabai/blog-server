/*
 * @Author: 王鑫
 * @Description: 定义创建文章接口
 * @Date: 2022-04-13 11:18:55
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: '文章名称' })
  @IsNotEmpty({ message: '缺少文章名称' })
  readonly articleName: string;

  @ApiPropertyOptional({ description: '文章内容' })
  @IsOptional()
  readonly content: string;

  @ApiPropertyOptional({ description: '文章内容' })
  @IsOptional()
  readonly htmlContent: string;

  @ApiPropertyOptional({ description: '文章简介' })
  @IsOptional()
  readonly intro: string;

  @ApiPropertyOptional({ description: '文章标签' })
  @IsOptional()
  readonly tag: string;

  @ApiProperty({ description: '文章分类' })
  @IsNotEmpty({ message: '缺少文章名称' })
  readonly category: number;
}

export class ArticleInfoDto {
  public id: number;
  public articleName: string;
  public content: string;
  public coverUrl: string;
  public category: string;
  public tags: string[];
  public access: number;
  public like: number;
}

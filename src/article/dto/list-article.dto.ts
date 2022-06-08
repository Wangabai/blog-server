/*
 * @Author: 王鑫
 * @Description: 文章列表
 * @Date: 2022-04-14 13:29:32
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class ListArticleDto {
  @ApiProperty({ description: '文章名称' })
  @IsOptional()
  articleName: string;

  @ApiProperty({ description: '页数' })
  @IsNotEmpty({ message: '缺少页数' })
  page: number;

  @ApiProperty({ description: '列表条数' })
  @IsNotEmpty({ message: '缺少列表条数' })
  pageSize: number;
}

export class WebListArticleDto {
  @ApiProperty({ description: '分类' })
  categoryId: number;

  @ApiProperty({ description: '页数' })
  @IsNotEmpty({ message: '缺少页数' })
  page: number;
}

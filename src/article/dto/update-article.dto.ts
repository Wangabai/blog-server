/*
 * @Author: 王鑫
 * @Description: 更新博客
 * @Date: 2022-04-13 11:18:55
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @ApiProperty({ description: '博客Id' })
  @IsNotEmpty({ message: '缺少博客Id' })
  id: number;

  @ApiProperty({ description: '博客名称' })
  @IsNotEmpty({ message: '缺少博客名称' })
  articleName: string;

  @ApiProperty({ description: '作者' })
  @IsNotEmpty({ message: '缺少作者' })
  author: string;

  @ApiProperty({ description: '博客类型' })
  @IsNotEmpty({ message: '缺少博客类型' })
  type: number;

  @ApiProperty({ description: '博客内容' })
  @IsOptional()
  content: string;
}

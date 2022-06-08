/*
 * @Author: 王鑫
 * @Description: 前台页面参数
 * @Date: 2022-06-07 15:48:15
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class WebListArticleDto {
  @ApiProperty({ description: '分类' })
  @IsOptional()
  categoryId: string | number;

  @ApiProperty({ description: '页数' })
  @IsNotEmpty({ message: '缺少页数' })
  page: number;
}

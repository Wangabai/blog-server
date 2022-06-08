/*
 * @Author: 王鑫
 * @Description: 创建文章
 * @Date: 2022-05-17 14:04:31
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: '分类名称' })
  @IsNotEmpty({ message: '请输入分类名称' })
  @IsString()
  name: string;
}

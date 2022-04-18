/*
 * @Author: 王鑫
 * @Description:博客Id
 * @Date: 2022-04-14 14:28:05
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IdArticleDto {
  @ApiProperty({ description: '博客Id' })
  @IsNotEmpty({ message: '缺少博客Id' })
  id: number;
}

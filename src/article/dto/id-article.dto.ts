/*
 * @Author: 王鑫
 * @Description:文章Id
 * @Date: 2022-04-14 14:28:05
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IdArticleDto {
  @ApiProperty({ description: '文章Id' })
  @IsNotEmpty({ message: '缺少文章Id' })
  id: number;
}

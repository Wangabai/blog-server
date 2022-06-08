/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-05-17 13:35:18
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: '标签名称' })
  @IsNotEmpty()
  name: string;
}

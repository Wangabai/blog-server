/*
 * @Author: 王鑫
 * @Description: 用户信息
 * @Date: 2022-04-12 10:48:15
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserInfoDto {
  @ApiProperty({ description: '用户id' })
  id: number;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '用户昵称' })
  nickname: string;

  @ApiProperty({ description: '用户头像' })
  avatar: string;

  @ApiProperty({ description: '用户邮箱' })
  email: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;
}

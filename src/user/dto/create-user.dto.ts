/*
 * @Author: 王鑫
 * @Description: 定义创建用户接口
 * @Date: 2022-04-12 10:26:01
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string;

  @ApiProperty({ description: '昵称' })
  @IsNotEmpty({ message: '请输入昵称' })
  nickname: string;

  @ApiProperty({ description: '邮箱' })
  @IsNotEmpty({ message: '请输入邮箱' })
  email: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string;
}

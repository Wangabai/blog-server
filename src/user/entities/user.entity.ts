/*
 * @Author: 王鑫
 * @Description: 用户实体
 * @Date: 2022-04-12 10:26:01
 */
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @ApiProperty({ description: '用户id' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column({ length: 100 })
  username: string; // 用户名

  @ApiProperty({ description: '昵称' })
  @Column({ length: 100 })
  nickname: string; //昵称

  @ApiProperty({ description: '密码' })
  @Column()
  @Exclude()
  password: string; // 密码

  @ApiProperty({ description: '邮箱' })
  @Column()
  email: string;

  @ApiProperty({ description: '创建时间' })
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert() // 表示该方法在数据插入之前调用
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}

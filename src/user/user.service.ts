/*
 * @Author: 王鑫
 * @Description: 用户业务逻辑
 * @Date: 2022-04-12 10:26:01
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * @description: 账号密码注册
   * @param {CreateUserDto} createUser
   * @return {*}
   */
  async register(createUser: CreateUserDto) {
    const newUser = await this.userRepository.create(createUser);
    return await this.userRepository.save(newUser);
  }

  /**
   * @description: 登陆获取TOKEN
   * @param {Partial} user
   * @return {*}
   */
  async login(user: Partial<User>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
    });

    return { token };
  }

  /**
   * @description: 生成TOKEN
   * @param {Partial} user
   * @return {*}
   */
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async getUser(user) {
    const { username } = user;
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  comparePassword(password, libPassword) {
    return compareSync(password, libPassword);
  }
}

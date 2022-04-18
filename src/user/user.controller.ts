/*
 * @Author: 王鑫
 * @Description: 接口
 * @Date: 2022-04-12 10:26:01
 */
import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    const user = await this.userService.getUser(createUser);
    if (user) throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    this.userService.register(createUser);
    return {
      message: '注册成功',
    };
  }

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    const data = await this.userService.login(req.user);
    return {
      data: data,
      message: '登陆成功',
    };
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user-info')
  async getUserInfo(@Req() req) {
    const data = await this.userService.getUser(req.user);
    return {
      data: data,
      message: '获取成功',
    };
  }
}

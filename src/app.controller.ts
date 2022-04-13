/*
 * @Author: 王鑫
 * @Description: 路由装饰器
 * @Date: 2022-03-03 13:18:06
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

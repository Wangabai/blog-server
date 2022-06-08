/*
 * @Author: 王鑫
 * @Description: 标签控制器
 * @Date: 2022-05-17 13:35:18
 */
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '创建标签' })
  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: CreateTagDto) {
    return this.tagService.create(body.name);
  }

  @ApiOperation({ summary: '标签筛选框' })
  @Get('select-list')
  @UseGuards(AuthGuard('jwt'))
  async selectList() {
    const list = await this.tagService.findAll();
    return {
      data: list,
    };
  }

  @ApiOperation({ summary: '标签列表' })
  @Post('list')
  @UseGuards(AuthGuard('jwt'))
  async list(@Body() list: { page: number; pageSize: number }) {
    const data = await this.tagService.list(list);
    return {
      data: data,
    };
  }
}

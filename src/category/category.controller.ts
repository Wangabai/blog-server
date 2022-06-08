/*
 * @Author: 王鑫
 * @Description: 分类控制器
 * @Date: 2022-05-17 14:04:31
 */
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文章分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiOperation({ summary: '创建分类' })
  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateCategoryDto) {
    return await this.categoryService.create(body.name);
  }

  @ApiOperation({ summary: '分类列表' })
  @Get('select-list')
  @UseGuards(AuthGuard('jwt'))
  async selectList() {
    const list = await this.categoryService.findAll();
    return {
      data: list,
    };
  }

  @ApiOperation({ summary: '标签列表' })
  @Post('list')
  @UseGuards(AuthGuard('jwt'))
  async list(@Body() list: { page: number; pageSize: number }) {
    const data = await this.categoryService.list(list);
    return {
      data: data,
    };
  }
}

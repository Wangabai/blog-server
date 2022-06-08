/*
 * @Author: 王鑫
 * @Description:web端接口
 * @Date: 2022-05-09 15:55:36
 */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WebService } from './web.service';
import { ArticleService } from '../article/article.service';
import { CategoryService } from '../category/category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdArticleDto } from '../article/dto/id-article.dto';
import { WebListArticleDto } from './dto/list.dto';

@ApiTags('前台页面')
@Controller('web')
export class WebController {
  constructor(
    private readonly webService: WebService,
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoryService,
  ) {}

  @ApiOperation({ summary: '第一次获取文章列表' })
  @Get('article')
  async findArticleAll() {
    const data = await this.articleService.webList();
    return {
      data: data,
    };
  }

  @ApiOperation({ summary: '获取最新文章列表' })
  @Get('new')
  async getNewArticle() {
    const data = await this.articleService.getNewArticle();
    return {
      data: data,
    };
  }

  @ApiOperation({ summary: '加载更多文章' })
  @Post('list')
  async listArticle(@Body() listArticleDto: WebListArticleDto) {
    const categoryId = Number(listArticleDto.categoryId);
    const data = await this.articleService.webUpdataList({
      categoryId: categoryId,
      page: listArticleDto.page,
    });
    return {
      data: data,
    };
  }

  @ApiOperation({ summary: '获取文章详情' })
  @Get('detail')
  async findOne(@Query() idDto: IdArticleDto) {
    const id = Number(idDto.id);
    const data = await this.articleService.detail(id, 1);
    return {
      data: data,
    };
  }

  @ApiOperation({ summary: '点赞' })
  @Get('like')
  async like(@Query() idDto: IdArticleDto) {
    const id = Number(idDto.id);
    await this.articleService.like(id);
    return {
      message: '点赞成功',
    };
  }

  @ApiOperation({ summary: '获取分类详情' })
  @Get('category')
  async findCategoryAll() {
    const data = await this.categoryService.findAll();
    return {
      data: data,
    };
  }
}

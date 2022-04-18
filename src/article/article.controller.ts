/*
 * @Author: 王鑫
 * @Description: 博客接口
 * @Date: 2022-04-13 11:18:55
 */
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ListArticleDto } from './dto/list-article.dto';
import { IdArticleDto } from './dto/id-article.dto';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  list: any[];
  constructor(private readonly articleService: ArticleService) {
    this.list = [];
  }

  @ApiOperation({ summary: '新增博客' })
  @Post('add')
  create(@Body() createArticleDto: CreateArticleDto) {
    this.articleService.create(createArticleDto);
    return {
      message: '新增成功',
    };
  }

  @ApiOperation({ summary: '博客列表' })
  @Post('list')
  async listArticle(@Body() listArticleDto: ListArticleDto) {
    let data = await this.articleService.list(listArticleDto);
    const { total } = data;
    const { pageSize } = listArticleDto;
    if (total < pageSize) {
      listArticleDto.page = 1;
      data = await this.articleService.list(listArticleDto);
    }
    return {
      data: data,
    };
  }

  @ApiOperation({ summary: '博客详情' })
  @Get('detail')
  async findOne(@Query() idDto: IdArticleDto) {
    const id = Number(idDto.id);
    const data = await this.articleService.detail(id);
    return {
      data: data,
    };
  }

  @ApiOperation({ summary: '编辑博客' })
  @Post('edit')
  update(@Body() article: UpdateArticleDto) {
    this.articleService.update(article);
    return {
      message: '编辑成功',
    };
  }

  @ApiOperation({ summary: '删除博客' })
  @Post('delete')
  remove(@Body() idDto: IdArticleDto) {
    this.articleService.delete(idDto);
    return {
      message: '删除成功',
    };
  }
}

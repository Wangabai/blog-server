/*
 * @Author: 王鑫
 * @Description: 文章接口
 * @Date: 2022-04-13 11:18:55
 */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '新增博客' })
  @Post('add')
  create(@Body() createArticleDto: CreateArticleDto) {
    console.log(createArticleDto);
    return this.articleService.create(createArticleDto);
  }

  @ApiOperation({ summary: '博客列表' })
  @Get('list')
  findAll() {
    return '文章列表';
    return this.articleService.findAll();
  }

  @ApiOperation({ summary: '博客详情' })
  @Get('detail')
  findOne(@Param() id: string) {
    return '文章详情';
    return this.articleService.findOne(+id);
  }

  @ApiOperation({ summary: '编辑博客' })
  @Post('edit')
  update(@Body() article: UpdateArticleDto) {
    console.log(article);
    return '编辑文章';
  }

  @ApiOperation({ summary: '删除博客' })
  @Post('delete')
  remove(@Param() id: string) {
    return '删除文章';
    return this.articleService.remove(+id);
  }
}

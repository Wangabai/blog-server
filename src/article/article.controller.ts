/*
 * @Author: 王鑫
 * @Description: 文章接口
 * @Date: 2022-04-13 11:18:55
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ListArticleDto } from './dto/list-article.dto';
import { IdArticleDto } from './dto/id-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '新增文章' })
  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile('file') file,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    const id = await this.articleService.create(file, createArticleDto);
    return {
      message: '新增成功',
      data: id,
    };
  }

  @ApiOperation({ summary: '文章列表' })
  @Post('list')
  @UseGuards(AuthGuard('jwt'))
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

  @ApiOperation({ summary: '文章详情' })
  @Get('detail')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Query() idDto: IdArticleDto) {
    const id = Number(idDto.id);
    const data = await this.articleService.detail(id, 0);
    return {
      data: data,
    };
  }

  @ApiOperation({ summary: '编辑文章' })
  @Post('edit')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  update(@UploadedFile('file') file, @Body() article: UpdateArticleDto) {
    this.articleService.update(file, article);
    return {
      message: '编辑成功',
    };
  }

  @ApiOperation({ summary: '删除文章' })
  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  remove(@Body() idDto: IdArticleDto) {
    this.articleService.delete(idDto);
    return {
      message: '删除成功',
    };
  }
}

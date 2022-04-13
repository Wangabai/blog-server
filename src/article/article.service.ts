/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-04-13 11:18:55
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  // 创建文章
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.articleName = createArticleDto.articleName;
    article.type = createArticleDto.type;
    article.author = createArticleDto.author;
    if (createArticleDto.content) article.content = createArticleDto.content;
    const newArticle = this.articleRepository.save(article);
    return newArticle;
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}

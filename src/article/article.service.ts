/*
 * @Author: 王鑫
 * @Description: 博客服务
 * @Date: 2022-04-13 11:18:55
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ListArticleDto } from './dto/list-article.dto';
import { IdArticleDto } from './dto/id-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  /**
   * @description: 创建文章
   * @param {*}
   * @return {*}
   */
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.articleName = createArticleDto.articleName;
    article.type = createArticleDto.type;
    article.author = createArticleDto.author;
    if (createArticleDto.content) article.content = createArticleDto.content;
    const newArticle = this.articleRepository.save(article);
    return newArticle;
  }

  /**
   * @description: 列表分页查询
   * @param {ListArticleDto} listArticleDto
   * @return {*}
   */
  async list(listArticleDto: ListArticleDto) {
    const { articleName, page, pageSize } = listArticleDto;
    const list = await this.articleRepository.createQueryBuilder('article');
    list
      .where('article.isDeleted = :isDeleted', { isDeleted: 0 })
      .skip((page - 1) * pageSize)
      .take(pageSize);
    if (articleName)
      list.andWhere('article.articleName = :articleName', {
        articleName: articleName,
      });
    const result = await list.getMany();
    const total = await list.getCount();
    const count = Math.ceil(total / pageSize);

    const data = {
      list: result,
      total: total,
      count: count,
      page: Number(page),
      pageSize: Number(pageSize),
    };
    return data;
  }

  /**
   * @description: 获取博客详情
   * @param {number} id
   * @return {*}
   */
  async detail(id: number) {
    const articleDetail = await this.articleRepository.findOne(id);
    return articleDetail;
  }

  /**
   * @description: 更新博客
   * @param {UpdateArticleDto} updateArticleDto
   * @return {*}
   */
  async update(updateArticleDto: UpdateArticleDto): Promise<Article> {
    const { id } = updateArticleDto;
    const articleToUpdate = await this.articleRepository.findOne(id);
    articleToUpdate.articleName = updateArticleDto.articleName;
    articleToUpdate.type = updateArticleDto.type;
    articleToUpdate.author = updateArticleDto.author;
    articleToUpdate.content = updateArticleDto.content;
    const result = await this.articleRepository.save(articleToUpdate);
    return result;
  }

  /**
   * @description: 删除博客
   * @param {DeleteArticleDto} idDto
   * @return {*}
   */
  async delete(idDto: IdArticleDto) {
    const { id } = idDto;
    const articleToUpdate = await this.articleRepository.findOne(id);
    articleToUpdate.isDeleted = 1;
    const result = await this.articleRepository.save(articleToUpdate);
    return result;
  }
}

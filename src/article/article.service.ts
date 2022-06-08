/*
 * @Author: 王鑫
 * @Description: 文章服务
 * @Date: 2022-04-13 11:18:55
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ListArticleDto, WebListArticleDto } from './dto/list-article.dto';
import { IdArticleDto } from './dto/id-article.dto';
import { Article } from './entities/article.entity';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';
import * as dayjs from 'dayjs';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  /**
   * @description: 创建文章
   * @param {*}
   * @return {*}
   */
  async create(file: any, createArticleDto: CreateArticleDto): Promise<number> {
    const { articleName } = createArticleDto;
    if (!articleName)
      throw new HttpException('缺少文章标题', HttpStatus.BAD_REQUEST);
    const doc = await this.articleRepository.findOne({
      where: { articleName },
    });
    if (doc) throw new HttpException('存在相同文章名', HttpStatus.BAD_REQUEST);
    const { tag, category } = createArticleDto;
    const categoryDoc = await this.categoryService.findById(category);
    const tags = await this.tagService.findByIds(('' + tag).split(','));
    const article: Partial<Article> = {
      ...createArticleDto,
      category: categoryDoc,
      tags: tags,
      coverUrl: file.url,
    };
    const newArticle: Article = await this.articleRepository.create({
      ...article,
    });
    const created = await this.articleRepository.save(newArticle);
    return created.id;
  }

  /**
   * @description: 列表分页查询
   * @param {ListArticleDto} listArticleDto
   * @return {*}
   */
  async list(listArticleDto: ListArticleDto) {
    const { articleName, page, pageSize } = listArticleDto;
    const list = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .orderBy('article.updateTime', 'DESC');
    list
      .where('article.isDeleted = :isDeleted', { isDeleted: 0 })
      .orderBy('article.createTime', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);
    if (articleName)
      list.andWhere('article.articleName = :articleName', {
        articleName: articleName,
      });
    const result = await list.getMany();
    const returnList = result.map((article: any) => {
      return {
        id: article.id,
        articleName: article.articleName,
        htmlContent: article.htmlContent,
        intro: article.intro,
        coverUrl: article.coverUrl,
        like: article.like,
        access: article.access,
        createTime: dayjs(article.createTime).format('YYYY-MM-DD HH:MM:ss'),
        updateTime: dayjs(article.updateTime).format('YYYY-MM-DD HH:MM:ss'),
        isDeleted: article.isDeleted,
        category: article.category.name,
        tags: article.tags.map((tag: any) => {
          return tag.name;
        }),
      };
    });
    const total = await list.getCount();
    const count = Math.ceil(total / pageSize);

    const data = {
      list: returnList,
      total: total,
      count: count,
      page: Number(page),
      pageSize: Number(pageSize),
    };
    return data;
  }

  /**
   * @description: 前台页面第一次获取列表
   * @param
   * @return {*}
   */
  async webList() {
    const list = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .orderBy('article.createTime', 'DESC');
    list.where('article.isDeleted = :isDeleted', { isDeleted: 0 });
    const total = await list.getCount();
    const result = await list.take(5).getMany();
    const returnList = result.map((article: any) => {
      return {
        id: article.id,
        articleName: article.articleName,
        htmlContent: article.htmlContent,
        intro: article.intro,
        coverUrl: article.coverUrl,
        like: article.like,
        access: article.access,
        createTime: dayjs(article.createTime).format('YYYY-MM-DD HH:MM:ss'),
        updateTime: dayjs(article.updateTime).format('YYYY-MM-DD HH:MM:ss'),
        isDeleted: article.isDeleted,
        category: article.category.name,
        tags: article.tags.map((tag: any) => {
          return tag.name;
        }),
      };
    });
    const data = {
      list: returnList,
      count: total,
    };
    return data;
  }

  /**
   * @description: 前台页面获取列表
   * @param {WebListArticleDto} listArticleDto
   * @return {*}
   */
  async webUpdataList(listArticleDto: WebListArticleDto) {
    const { categoryId, page } = listArticleDto;
    const list = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .orderBy('article.createTime', 'DESC');
    list.where('article.isDeleted = :isDeleted', { isDeleted: 0 });
    if (categoryId && categoryId !== 0) {
      list.where('article.category = :category', { category: categoryId });
    }
    const total = await list.getCount();
    const result = await list
      .skip((page - 1) * 5)
      .take(5)
      .getMany();
    const returnList = result.map((article: any) => {
      return {
        id: article.id,
        articleName: article.articleName,
        htmlContent: article.htmlContent,
        intro: article.intro,
        coverUrl: article.coverUrl,
        like: article.like,
        access: article.access,
        createTime: dayjs(article.createTime).format('YYYY-MM-DD HH:MM:ss'),
        updateTime: dayjs(article.updateTime).format('YYYY-MM-DD HH:MM:ss'),
        isDeleted: article.isDeleted,
        category: article.category.name,
        tags: article.tags.map((tag: any) => {
          return tag.name;
        }),
      };
    });
    const data = {
      list: returnList,
      count: total,
    };
    return data;
  }

  /**
   * @description: 获取最新文章
   * @return {*}
   */
  async getNewArticle() {
    const list = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .orderBy('article.createTime', 'DESC');
    list.where('article.isDeleted = :isDeleted', { isDeleted: 0 });
    const result = await list.take(3).getMany();
    const returnList = result.map((article: any) => {
      return {
        id: article.id,
        articleName: article.articleName,
        htmlContent: article.htmlContent,
        intro: article.intro,
        coverUrl: article.coverUrl,
        like: article.like,
        access: article.access,
        createTime: dayjs(article.createTime).format('YYYY-MM-DD HH:MM:ss'),
        updateTime: dayjs(article.updateTime).format('YYYY-MM-DD HH:MM:ss'),
        isDeleted: article.isDeleted,
        category: article.category.name,
        tags: article.tags.map((tag: any) => {
          return tag.name;
        }),
      };
    });
    return returnList;
  }

  /**
   * @description: 获取文章详情
   * @param {number} id
   * @return {*}
   */
  async detail(id: number, type: number) {
    const qb = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .where('article.id=:id')
      .setParameter('id', id);
    const articleDetail = await qb.getOne();

    if (type === 1) {
      articleDetail.access += 1;
      await this.articleRepository.save(articleDetail);
    }
    if (!articleDetail)
      throw new HttpException('该文章不存在', HttpStatus.BAD_REQUEST);
    const detail = {
      id: articleDetail.id,
      articleName: articleDetail.articleName,
      content: articleDetail.content,
      htmlContent: articleDetail.htmlContent,
      intro: articleDetail.intro,
      coverUrl: articleDetail.coverUrl,
      like: articleDetail.like,
      access: articleDetail.access,
      createTime: dayjs(articleDetail.createTime).format('YYYY-MM-DD HH:MM:ss'),
      updateTime: dayjs(articleDetail.updateTime).format('YYYY-MM-DD HH:MM:ss'),
      isDeleted: articleDetail.isDeleted,
      category: articleDetail.category,
      tags: articleDetail.tags,
    };
    return detail;
  }

  /**
   * @description: 更新文章
   * @param {UpdateArticleDto} updateArticleDto
   * @return {*}
   */
  async update(
    file: any | null,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const { id } = updateArticleDto;
    const articleToUpdate = await this.articleRepository.findOne(id);
    if (!articleToUpdate) {
      throw new HttpException(`该文章不存在`, HttpStatus.BAD_REQUEST);
    }
    const { tag, category } = updateArticleDto;
    const categoryDoc = await this.categoryService.findById(category);
    const tags = await this.tagService.findByIds(('' + tag).split(','));
    const newArticle = {
      ...updateArticleDto,
      category: categoryDoc,
      tags: tags,
    };
    if (file) {
      Object.assign(newArticle, { coverUrl: file.url });
    }
    const updataArticle = this.articleRepository.merge(
      articleToUpdate,
      newArticle,
    );
    updataArticle.id = parseInt(updataArticle.id.toString());
    const result = await this.articleRepository.save(updataArticle);
    return result;
  }

  /**
   * @description: 删除文章
   * @param {DeleteArticleDto} idDto
   * @return {*}
   */
  async delete(idDto: IdArticleDto) {
    const { id } = idDto;
    const articleToUpdate = await this.articleRepository.findOne(id);
    if (!articleToUpdate)
      throw new HttpException(`该文章不存在`, HttpStatus.BAD_REQUEST);
    articleToUpdate.isDeleted = 1;
    const result = await this.articleRepository.save(articleToUpdate);
    return result;
  }

  /**
   * @description: 点赞文章
   * @param {number} id
   * @return {*}
   */
  async like(id: number) {
    const articleToUpdate = await this.articleRepository.findOne(id);
    if (!articleToUpdate)
      throw new HttpException(`该文章不存在`, HttpStatus.BAD_REQUEST);
    articleToUpdate.like += 1;
    const result = await this.articleRepository.save(articleToUpdate);
    return result;
  }
}

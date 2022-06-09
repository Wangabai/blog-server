/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-04-13 11:18:55
 */
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { MulterModule } from '@nestjs/platform-express';
const MAO = require('multer-aliyun-oss');
import localConfig from '../../config-env/oss';
@Module({
  imports: [
    MulterModule.register({
      storage: MAO({
        config: localConfig,
        // to set path prefix for files, could be string or function
        destination: '/blog-image',
      }),
    }),
    TypeOrmModule.forFeature([Article]),
    CategoryModule,
    TagModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}

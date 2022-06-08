/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-05-09 15:55:36
 */
import { Module } from '@nestjs/common';
import { WebService } from './web.service';
import { WebController } from './web.controller';
import { ArticleModule } from '../article/article.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [ArticleModule, CategoryModule],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}

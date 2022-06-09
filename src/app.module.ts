/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-03-03 13:18:06
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { WebModule } from './web/web.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
// import { MulterModule } from '@nestjs/platform-express';

// const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ArticleModule,
    WebModule,
    TagModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

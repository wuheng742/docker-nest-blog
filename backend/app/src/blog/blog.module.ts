import { Module } from '@nestjs/common';
import { ArticleController, CategoryController } from './blog.controller';
import { ArticleService, CategoryService } from './blog.service';
import { Article, articleSchema } from './schamas/article.schema';
import { Category, categorySchema } from './schamas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Article.name, schema: articleSchema},{name: Category.name, schema: categorySchema}])
  ],
  controllers: [ArticleController, CategoryController],
  providers: [ArticleService, CategoryService]
})
export class BlogModule {}

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { from } from 'rxjs';
import { ArticleService, CategoryService } from './blog.service';
import { Article } from './schamas/article.schema';
import { Category } from './schamas/category.schema';
import { ValidateDBId } from './shared/pipes/validate-db-id.pipe';
import { Request } from 'express'

interface CustomResponse {
    status: Number,
    data: any,
    message: String,
}

@Controller('article')
export class ArticleController {

    constructor(private readonly articleService: ArticleService) {

    }

    @Get()
    async articles() {
        const articles = await this.articleService.findAll();
        return articles;
    }

    @Get(':id')
    async article(@Param('id', ValidateDBId) id: string) {
        const articles = await this.articleService.findOne(id);
        return articles;
    }

    @Post()
    async createArticle(@Body() article:Article) {
        const newArticle = await this.articleService.create(article);
        return newArticle;
    }
}


@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {

    }

    @Get()
    async categorys() {
        const categorys = await this.categoryService.findAll();
        return categorys;
    }

    @Get(':id')
    async category(@Param('id', ValidateDBId) id: string) {
        const category = await this.categoryService.findOne(id);
        return category;
    }

    @Post()
    async createCategory(@Body() category: Category, @Req() request: Request) {
        console.log(request.body);
        const newCategory = await this.categoryService.create(category);
        return newCategory;
    }
}
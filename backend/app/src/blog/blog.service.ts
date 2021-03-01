import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { ArticleDocument, Article } from './schamas/article.schema';
import { Category, CategoryDocument } from './schamas/category.schema';


@Injectable()
export class ArticleService {

    articlePropObject: object

    constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>) {
        this.articlePropObject = {
            title: 1, 
            subTitle: 1,
            content: 1,
            category: 1,
            created: 1,
        }
    }

    async create(article: Article): Promise<Article> {
        const model = new this.articleModel(article);
        return model.save();
    }

    async editArticle(articleId: String, article: Article): Promise<Article> {
        // new 表示会返回更新之后的模型
        const editedPost = await this.articleModel
            .findByIdAndUpdate(articleId, article, { new: true }).exec();
        return editedPost;
    }

    async deleteArticle(articleId: String): Promise<Article> {
        const deletedPost = await this.articleModel.findByIdAndRemove(articleId).exec();
        return deletedPost;
    }

    async findOne(articleId: String): Promise<Article> {
        const post = await this.articleModel
            .findById(articleId).populate(Category.name)
            .exec();
        return post;
    }

    async findAll(): Promise<Article[]> {
        const articles = this.articleModel.find({}).populate(Category.name).exec();
        return articles;
    }

}

@Injectable()
export class CategoryService {

    categoryPropObject: object

    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {
        this.categoryPropObject = {
            title: 1, 
            subTitle: 1,
            created: 1,
        }
    }

    async create(category: Category): Promise<Category> {
        const model = new this.categoryModel(category);
        return model.save();
    }

    async editCategory(id: String, category: Category): Promise<Category> {
        // new 表示会返回更新之后的模型
        const editCategory = await this.categoryModel
            .findByIdAndUpdate(id, category, { new: true }).exec();
        return editCategory; 
    }

    async deleteCategory(id: String): Promise<Category> {
        const deletedCategory = await this.categoryModel.findByIdAndRemove(id).exec();
        return deletedCategory;
    }

    async findOne(id: String): Promise<Category> {
        const post = await this.categoryModel
                                .findById(id)
                                .select(this.categoryPropObject)
                                .exec();
        return post;
    }

    async findAll(): Promise<Category[]> {
        const categorys = this.categoryModel.find({}, this.categoryPropObject).exec();
        return categorys;
    }

}

import * as mongoose from 'mongoose';
import { Category } from './category.schema';


export const articleSchema = new mongoose.Schema({
    title: String,
    subTitle: String,
    content: String,
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Category.name,
    },
}, {
    timestamps: {
        createdAt: 'created', 
        updatedAt: 'updated'
    },
    toObject: {
        transform: (doc: any, ret: any, options: any) => {
            ret.aid = doc._id;
            delete ret._id;
            return ret;
        }
    },
    toJSON: {
        transform: (doc: any, ret: any, options: any) => {
            ret.aid = doc._id;
            delete ret._id;
            return ret;
        }
    },
})


export interface ArticleDocument extends mongoose.Document {
    readonly title: string
    readonly subTitle: string
    readonly content: string
    readonly category: string
}

export class Article {
    title: string
    subTitle: string
    content: string
    category: string
}

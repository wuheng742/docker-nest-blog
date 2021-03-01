import * as mongoose from 'mongoose';


export const categorySchema = new mongoose.Schema({
    title: String,
    subTitle: String,
}, {
    timestamps: {
        createdAt: 'created', 
        updatedAt: 'updated'
    },
    toObject: {
        transform: (doc: any, ret: any, options: any) => {
            ret.cid = doc._id;
            delete ret._id;
            return ret;
        }
    },
    toJSON: {
        transform: (doc: any, ret: any, options: any) => {
            ret.cid = doc._id;
            delete ret._id;
            return ret;
        }
    },
})


export interface CategoryDocument extends mongoose.Document {
    readonly title: string
    readonly subTitle: string
}

export class Category {
    title: string
    subTitle: string
}
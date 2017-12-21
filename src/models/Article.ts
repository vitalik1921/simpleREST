import * as mongoose from 'mongoose';

export interface IArticle extends mongoose.Document {
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    votes: number;
}

const ArticleSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    userId: { type: String },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    votes: { type: Number, default: 0 }
});

export default mongoose.model('Article', ArticleSchema);


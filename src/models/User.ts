import { IUser } from './User';
import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
});

export default mongoose.model('User', UserSchema);


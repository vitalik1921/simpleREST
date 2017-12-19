import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String }
});

export default mongoose.model('User', UserSchema);


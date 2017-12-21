import * as mongoose from 'mongoose';

export interface IAccessToken extends mongoose.Document {
    userId: string;
    expired: Date;
}

const AccessTokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    expired: { type: Date, required: true }
});

export default mongoose.model('AccessToken', AccessTokenSchema);


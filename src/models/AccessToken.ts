import * as mongoose from 'mongoose';

export interface IAccessToken extends mongoose.Document {
    userId: string;
}

const AccessTokenSchema = new mongoose.Schema({
    userId: { type: String }
});

export default mongoose.model('AccessToken', AccessTokenSchema);


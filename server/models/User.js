import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema({
    username: String,
    email: String,
    password:String,
    role: String
});

export const UserModel = mongoose.model('User', UserSchema);

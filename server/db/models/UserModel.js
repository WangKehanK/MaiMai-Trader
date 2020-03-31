import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const Contact = {
    wechat: String,
    email: String,
    phone: String,
    qq: String
}

const School = {
    schoolId: String,
    schoolName: String,
}

const Locale = {
    city: String,
    state: String,
    country: String
}

const User = {
    userName: String,
    unionId: String,
    openId: String,
    gender: String,
    avatar: String,
    locale: Locale,
    school: School,
    contact: Contact
};

const UserSchema = new Schema({
    ...User,
    createdTime: Date,
});

const UserModel = mongoose.model('User', UserSchema, "users");

export {
    UserModel, User
};
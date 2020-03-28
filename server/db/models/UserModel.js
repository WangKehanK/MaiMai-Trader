import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const Contact = {
    wechat: String,
    email: String,
    phone: String,
    qq: String
}

const User = {
    userid: {
        type: String
    },
    userName: {
        type: String
    },
    school: {
        type: String
    },
    unionId: {
        type: String
    },
    contact: Contact
};

const UserSchema = new Schema({
    user: User,
    createdTime: Date,
});

const UserModel = mongoose.model('User', UserSchema, "users");

export {
    UserModel, User
};
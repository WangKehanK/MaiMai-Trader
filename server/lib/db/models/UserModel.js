'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = exports.UserModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginateV = require('mongoose-paginate-v2');

var _mongoosePaginateV2 = _interopRequireDefault(_mongoosePaginateV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Contact = {
    wechat: String,
    email: String,
    phone: String,
    qq: String
};

var School = {
    schoolId: String,
    schoolName: String
};

var Locale = {
    city: String,
    state: String,
    country: String
};

var User = {
    userName: String,
    unionId: String,
    openId: String,
    gender: String,
    avatar: String,
    locale: Locale,
    school: School,
    contact: Contact
};

var UserSchema = new Schema({
    //...User,
    userName: String,
    unionId: String,
    openId: String,
    gender: String,
    avatar: String,
    locale: Locale,
    school: School,
    contact: Contact,
    createdTime: Date
});

var UserModel = _mongoose2.default.model('User', UserSchema, "users");

exports.UserModel = UserModel;
exports.User = User;
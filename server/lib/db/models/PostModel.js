"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Post = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginateV = require("mongoose-paginate-v2");

var _mongoosePaginateV2 = _interopRequireDefault(_mongoosePaginateV);

var _UserModel = require("./UserModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var DeliveryMethod = {
    deliveryType: {
        type: String
    },
    address: {
        type: String
    },
    carrier: {
        type: String
    }
};

var Price = {
    offerPrice: {
        type: Number
    },
    originalPrice: {
        type: Number
    }
};

var PostSchema = new Schema({
    isDraft: {
        type: Boolean
    },
    postId: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    condition: {
        type: String
    },
    image: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    deliveryMethod: DeliveryMethod,
    price: Price,
    user: _UserModel.User,
    userId: String,
    createdTime: Date,
    expiryTime: Date
});

PostSchema.plugin(_mongoosePaginateV2.default);

var Post = _mongoose2.default.model('Poster', PostSchema, "posts");

exports.Post = Post;
import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";
import { User } from "./UserModel.js";

const Schema = mongoose.Schema;

const DeliveryMethod = {
    deliveryType: {
        type: [String]
    },
    address: {
        type: String
    },
    carrier: {
        type: String
    }
};

const Price = {
    offerPrice: {
        type: Number
    },
    originalPrice: {
        type: Number
    }
};

const PostSchema = new Schema({
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
    subCategory: {
        type: String
    },
    condition: {
        type: String
    },
    image: {
        type: [String]
    },
    tags: {
        type: [String],
    },
    isSellBefore: {
        type: Boolean
    },
    deliveryMethod: DeliveryMethod,
    price: Price,
    user: User,
    userId: String,
    createdTime: Date,
    expiryTime: Date
});

PostSchema.plugin(mongoosePaginate)

const Post = mongoose.model('Poster', PostSchema, "posts");

export { Post };
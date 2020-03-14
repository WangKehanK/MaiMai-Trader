import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DeliveryMethod = {
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

const Price = {
    offerPrice: {
        type: Number
    },
    originalPrice: {
        type: Number
    }
};

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
    contact: Contact
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
    condition: {
        type: String
    },
    image: {
        type: [String]
    },
    tags: {
        type: [String],
    },
    deliveryMethod: DeliveryMethod,
    price: Price,
    user: User,
    userId: String
});

const Post = mongoose.model('Poster', PostSchema, "posts");

export { Post };
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DeliveryMethod = {
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    carrier: {
        type: String,
        required: true
    }
};

const Price = {
    offerPrice: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: false
    }
};

const User = {
    userid: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    }
};


const Poster = new Schema({
    postId: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: false
    },
    image: {
        type: [String],
        required: true
    },
    deliveryMethod: DeliveryMethod,
    price: Price,
    user: User
});

const Post = mongoose.model('Poster', Poster, "posts");

export { Post };
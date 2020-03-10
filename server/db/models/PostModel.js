import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Poster = new Schema({
    postId: {
        type: String,
        required: true
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
    deliveryMethod: {
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
    },
    price: {
        offerPrice: {
            type: Number,
            required: true
        },
        originalPrice: {
            type: Number,
            required: false
        }
    },
    user: {
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
    }
});

const Post = mongoose.model('Poster', Poster, "posts");

export { Post };
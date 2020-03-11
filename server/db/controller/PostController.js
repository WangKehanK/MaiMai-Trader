import { Post } from "../models/PostModel.js"

const createPost = function ({ post }) {
    const newPost = new Post(post);
    
    newPost.save(function (err, post) {
        if (err) {
            console.log(err);
        } else {
            console.log(post.postId + " saved to posts collection.");
        }
    });
};

const getPostById = async function (args) {
    const query = await Post.find(args, null, function (err, docs) {
        return docs;
    })
    return query[0];
};

const getPosts = async function (_) {
    const query = await Post.find({}, null, (err, docs) => {
        return docs;
    })
    return query;
};


export { createPost, getPostById, getPosts }


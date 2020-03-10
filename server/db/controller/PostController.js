import { Post } from "../models/PostModel.js"

const createPost = function (args) {
    // const newPost = new Post({ postId: "507f1f77bcf86cd799439011", title: "漂亮桌子" });
    // newPost.save(function (err, post) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(post.postId + " saved to bookstore collection.");
    //     }
    // });
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


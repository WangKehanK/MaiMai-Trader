import { Post } from "../models/PostModel.js"
import { errorName } from "../../constants/statusCode.js";
import { ObjectId } from "../../helper/helper.js";

const createPost = async function ({ post }) {
    const postData = post;
    postData["isDraft"] = false;
    postData["postId"] = ObjectId();

    const newPost = new Post(postData);
    try {
        const doc = await newPost.save();
        return doc;
    } catch (err) {
        throw new Error(errorName.CREATE_FAILED);
    }
};

const createPostDraft = async function ({ post }) {
    const postData = post;
    postData["isDraft"] = true;
    postData["postId"] = ObjectId();

    const newPost = new Post(postData);
    try {
        const doc = await newPost.save();
        return doc;
    } catch (err) {
        console.log(err);
        throw new Error(errorName.CREATE_FAILED);
    }
};

const updatePost = async function ({ post }) {
    const postId = post.postId;
    try {
        const doc = await Post.updateOne({ postId: postId }, post, { multi: true })
        return post;
    } catch (err) {
        throw new Error(errorName.UPDATE_FAILED);
    }
}

const updatePostDraft = async function ({ post }) {
    const postId = post.postId;
    try {
        const doc = await Post.updateOne({ postId: postId }, post, { multi: true })
        return post;
    } catch (err) {
        throw new Error(errorName.UPDATE_FAILED);
    }
}

const getPostById = async function (args) {
    const query = await Post.find(args, null, (err, docs) => {
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

export { createPost, createPostDraft, getPostById, getPosts, updatePostDraft, updatePost }


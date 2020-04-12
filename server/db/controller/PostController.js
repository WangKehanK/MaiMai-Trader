import { Post } from "../models/PostModel.js"
import { errorName } from "../../constants/statusCode.js";
import { ObjectId } from "../../helper/helper.js";


const createPost = async function ({ post }) {
    const postData = post;
    postData["isDraft"] = false;
    postData["postId"] = ObjectId();
    postData["createdTime"] = new Date();
    postData["expiryTime"] = new Date(postData["expiryTime"]);

    const newPost = new Post(postData);
    try {
        await newPost.save();
        return true;
    } catch (err) {
        console.log(err);
        throw new Error(errorName.CREATE_FAILED);
    }
};

const createPostDraft = async function ({ post }) {
    const postData = post;
    postData["isDraft"] = true;
    postData["postId"] = ObjectId();

    const newPost = new Post(postData);
    try {
        await newPost.save();
        return true;
    } catch (err) {
        throw new Error(errorName.CREATE_FAILED);
    }
};

const updatePost = async function ({ post }) {
    const postId = post.postId;
    try {
        await Post.updateOne({ postId: postId }, post, { multi: true })
        return true;
    } catch (err) {
        throw new Error(errorName.UPDATE_FAILED);
    }
}

const updatePostDraft = async function ({ post }) {
    const postId = post.postId;
    try {
        await Post.updateOne({ postId: postId }, post, { multi: true })
        return true;
    } catch (err) {
        throw new Error(errorName.UPDATE_FAILED);
    }
}

const getPostById = async function (args) {
    try {
        const query = await Post.findOne(args, null);
        return query;
    } catch (err) {
        throw new Error(errorName.GET_POSTS_FAILED);
    }
};

const getPosts = async function ({ limit, offset, filters }) {
    var searchText = filters.text || "";
    delete filters.text;

    var processedFilters = JSON.parse(JSON.stringify(filters));

    try {
        const query = await Post.paginate({
            $or: [
                { description: { $regex: searchText, $options: "i" }, ...processedFilters },
                { title: { $regex: searchText, $options: "i" }, ...processedFilters }
            ]
        }, { offset: offset, limit: limit }).then(
            (docs, err) => {
                console.log(docs);
                return docs;
            }
        );

        return query.docs;
    } catch (err) {
        throw new Error(errorName.GET_POSTS_LIST_FAILED);
    }
};

export { createPost, createPostDraft, getPostById, getPosts, updatePostDraft, updatePost }


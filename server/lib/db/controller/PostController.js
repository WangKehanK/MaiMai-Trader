"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePost = exports.updatePostDraft = exports.getPosts = exports.getPostById = exports.createPostDraft = exports.createPost = undefined;

var _PostModel = require("../models/PostModel.js");

var _statusCode = require("../../constants/statusCode.js");

var _helper = require("../../helper/helper.js");

var createPost = async function createPost(_ref) {
    var post = _ref.post;

    var postData = post;
    postData["isDraft"] = false;
    postData["postId"] = (0, _helper.ObjectId)();
    postData["createdTime"] = new Date();
    // postData["expiryTime"] = new Date(postData["expiryTime"]);

    var newPost = new _PostModel.Post(postData);
    try {
        await newPost.save();
        console.log(postData["postId"]);
        return postData["postId"];
    } catch (err) {
        console.log(err);
        throw new Error(_statusCode.errorName.CREATE_FAILED);
    }
};

var createPostDraft = async function createPostDraft(_ref2) {
    var post = _ref2.post;

    var postData = post;
    postData["isDraft"] = true;
    postData["postId"] = (0, _helper.ObjectId)();

    var newPost = new _PostModel.Post(postData);
    try {
        await newPost.save();
        return postData["postId"];
    } catch (err) {
        throw new Error(_statusCode.errorName.CREATE_FAILED);
    }
};

var updatePost = async function updatePost(_ref3) {
    var post = _ref3.post;

    var postId = post.postId;
    try {
        await _PostModel.Post.updateOne({ postId: postId }, post, { multi: true });
        return postData["postId"];
    } catch (err) {
        throw new Error(_statusCode.errorName.UPDATE_FAILED);
    }
};

var updatePostDraft = async function updatePostDraft(_ref4) {
    var post = _ref4.post;

    var postId = post.postId;
    try {
        await _PostModel.Post.updateOne({ postId: postId }, post, { multi: true });
        return postData["postId"];
    } catch (err) {
        throw new Error(_statusCode.errorName.UPDATE_FAILED);
    }
};

var getPostById = async function getPostById(args) {
    try {
        var query = await _PostModel.Post.findOne(args, null);
        return query;
    } catch (err) {
        throw new Error(_statusCode.errorName.GET_POSTS_FAILED);
    }
};

var getPosts = async function getPosts(_ref5) {
    var limit = _ref5.limit,
        offset = _ref5.offset,
        filters = _ref5.filters;

    var searchText = filters.text || "";
    delete filters.text;

    var processedFilters = JSON.parse(JSON.stringify(filters));

    try {
        var query = await _PostModel.Post.paginate({
            $or: [{ description: { $regex: searchText, $options: "i" } }, // ...processedFilters },
            { title: { $regex: searchText, $options: "i" } //...processedFilters }
            }]
        }, { offset: offset, limit: limit }).then(function (docs, err) {
            console.log(docs);
            return docs;
        });

        return query.docs;
    } catch (err) {
        throw new Error(_statusCode.errorName.GET_POSTS_LIST_FAILED);
    }
};

exports.createPost = createPost;
exports.createPostDraft = createPostDraft;
exports.getPostById = getPostById;
exports.getPosts = getPosts;
exports.updatePostDraft = updatePostDraft;
exports.updatePost = updatePost;
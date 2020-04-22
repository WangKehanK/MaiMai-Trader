"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PostController = require("../../db/controller/PostController.js");

var _apolloServerExpress = require("apollo-server-express");

var _apolloServerExpress2 = _interopRequireDefault(_apolloServerExpress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Query: {
        getPostById: async function getPostById(obj, args, context, info) {
            var queryRes = await (0, _PostController.getPostById)(args).then(function (res) {
                return res;
            });
            return queryRes;
        },
        getPosts: async function getPosts(obj, args, context, info) {
            var queryRes = await (0, _PostController.getPosts)(args).then(function (res) {
                return res;
            });
            return queryRes;
        }
    },

    Mutation: {
        createPost: async function createPost(obj, args, context, info) {
            var input = JSON.parse(JSON.stringify(args));
            try {
                var mutationRes = await (0, _PostController.createPost)(input);
                return mutationRes;
            } catch (error) {
                console.log(error);
                return new _apolloServerExpress2.default.ApolloError(error.message);
            }
        },
        createPostDraft: async function createPostDraft(obj, args, context, info) {
            var input = JSON.parse(JSON.stringify(args));
            try {
                var mutationRes = await (0, _PostController.createPostDraft)(input);
                return mutationRes;
            } catch (error) {
                return new _apolloServerExpress2.default.ApolloError(error.message);
            }
        },
        updatePost: async function updatePost(obj, args, context, info) {
            var input = JSON.parse(JSON.stringify(args));
            try {
                var mutationRes = await (0, _PostController.updatePost)(input);
                return mutationRes;
            } catch (error) {
                return new _apolloServerExpress2.default.ApolloError(error.message);
            }
        },
        updatePostDraft: async function updatePostDraft(obj, args, context, info) {
            var input = JSON.parse(JSON.stringify(args));
            try {
                var mutationRes = await (0, _PostController.updatePostDraft)(input);
                return mutationRes;
            } catch (error) {
                return new _apolloServerExpress2.default.ApolloError(error.message);
            }
        }
    }
};
import { createPost, createPostDraft, getPosts, getPostById, updatePostDraft, updatePost } from "../../db/controller/PostController.js";
import ApolloServer from 'apollo-server-express';

export default {
    Query: {
        async getPostById(obj, args, context, info) {
            const queryRes = await getPostById(args).then(
                (res) => {
                    return res;
                }
            )
            return queryRes;
        },

        async getPosts(obj, args, context, info) {
            const queryRes = await getPosts(args).then(
                (res) => {
                    return res;
                }
            )
            return queryRes;
        }
    },

    Mutation: {
        async createPost(obj, args, context, info) {
            console.log(args);
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await createPost(input);
                return mutationRes;
            } catch (error) {
                console.log(error)
                return new ApolloServer.ApolloError(error.message);
            }
        },

        async createPostDraft(obj, args, context, info) {
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await createPostDraft(input);
                return mutationRes;
            } catch (error) {
                return new ApolloServer.ApolloError(error.message);
            }
        },

        async updatePost(obj, args, context, info) {
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await updatePost(input);
                return mutationRes;
            } catch (error) {
                return new ApolloServer.ApolloError(error.message);
            }
        },

        async updatePostDraft(obj, args, context, info) {
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await updatePostDraft(input);
                return mutationRes;
            } catch (error) {
                return new ApolloServer.ApolloError(error.message);
            }
        }
    }
}
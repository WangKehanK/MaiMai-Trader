import { createPost, createPostDraft, getPosts, getPostById, updatePostDraft, updatePost } from "../../db/controller/PostController.js";
import ApolloServer from 'apollo-server-express';

var posts = [
    {
        postId: "507f1f77bcf86cd799439011",
        title: "漂亮桌子",
        description: "搬家甩卖！！！（桌子，椅子，餐桌，电饭锅，厨房 方形梳妆镜 20刀↵4. 实木书桌 $50",
        category: "Furniture",
        condition: "New",
        image: {},
        delieveryMethod: {
            "type": "pickUp",
            "address": "1079 Commonwealth Avenue",
            "carrier": "UPS"
        },
        price: {
            "offerPrice": 15,
            "originalPrice": 35
        },
        user: {
            userId: "myz1998313",
            userName: "马小跳",
            school: "波士顿大学"
        }
    }
];

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

        async getPosts(args) {
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
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await createPost(input);
                return mutationRes;
            } catch (error) {
                return new ApolloServer.ApolloError(error.message);;
            }
        },

        async createPostDraft(obj, args, context, info) {
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await createPostDraft(input);
                return mutationRes;
            } catch (error) {
                return new ApolloServer.ApolloError(error.message);;
            }
        },

        async updatePost(obj, args, context, info) {
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await updatePost(input);
                return mutationRes;
            } catch (error) {
                return new ApolloServer.ApolloError(error.message);;
            }
        },

        async updatePostDraft(obj, args, context, info) {
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await updatePostDraft(input);
                return mutationRes;
            } catch (error) {
                return new ApolloServer.ApolloError(error.message);;
            }
        }
    }
}
import { authenticate, phoneNumberLogin } from "../../db/controller/UserController.js";
import ApolloServer from 'apollo-server-express';

var users = [
    {
        userId: 1,
        userName: 'Brian',
        age: '21',
        gender: 'M'
    },
    {
        userId: 2,
        userName: 'Kim',
        age: '22',
        gender: 'M'
    }
];

var getUser = function (args) {
    return users[0];
}

var getUsers = function (args) {
    return users;
}

export default {
    Query: {
        getUser: getUser,
        phoneNumberLogin: async function (obj, args, context, info) {
            const input = JSON.parse(JSON.stringify(args));
            try {
                const res = await phoneNumberLogin(input);
                return res;
            } catch (error) {
                // console.log(error);
                return new ApolloServer.ApolloError(error);;
            }
        },
        // getUsers: getUsers
    }, Mutation: {
        authenticate: async function (obj, args, context, info) {
            const input = JSON.parse(JSON.stringify(args));
            try {
                const mutationRes = await authenticate(input);
                return mutationRes;
            } catch (error) {
                console.log(error)
                return new ApolloServer.ApolloError(error.message);;
            }
        },

    }
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UserController = require('../../db/controller/UserController.js');

var _apolloServerExpress = require('apollo-server-express');

var _apolloServerExpress2 = _interopRequireDefault(_apolloServerExpress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = [{
    userId: 1,
    userName: 'Brian',
    age: '21',
    gender: 'M'
}, {
    userId: 2,
    userName: 'Kim',
    age: '22',
    gender: 'M'
}];

var getUser = function getUser(args) {
    return users[0];
};

var getUsers = function getUsers(args) {
    return users;
};

exports.default = {
    Query: {
        getUser: getUser,
        getUsers: getUsers
    }, Mutation: {
        authenticate: async function authenticate(obj, args, context, info) {
            var input = JSON.parse(JSON.stringify(args));
            try {
                var mutationRes = await (0, _UserController.authenticate)(input);
                return mutationRes;
            } catch (error) {
                console.log(error);
                return new _apolloServerExpress2.default.ApolloError(error.message);;
            }
        }
    }
};
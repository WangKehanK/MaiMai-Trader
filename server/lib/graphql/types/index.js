'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    scalar Date\n    type Query {\n        _empty: String\n    }\n    type Mutation {\n        _empty: String\n    }\n    type Subscription {\n        _empty: String\n    }\n'], ['\n    scalar Date\n    type Query {\n        _empty: String\n    }\n    type Mutation {\n        _empty: String\n    }\n    type Subscription {\n        _empty: String\n    }\n']);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _Post = require('./Post.js');

var _Post2 = _interopRequireDefault(_Post);

var _User = require('./User.js');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var defaultTypeDefs = (0, _graphqlTag2.default)(_templateObject);

var typeDefs = [defaultTypeDefs, _Post2.default, _User2.default];

exports.default = typeDefs;
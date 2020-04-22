'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = require('graphql-tools');

var _graphqlTools2 = _interopRequireDefault(_graphqlTools);

var _index = require('./types/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./resolvers/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeExecutableSchema = _graphqlTools2.default.makeExecutableSchema;

var schema = makeExecutableSchema({ typeDefs: _index2.default, resolvers: _index4.default });

exports.schema = schema;
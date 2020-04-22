"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _PostResolver = require("./PostResolver.js");

var _PostResolver2 = _interopRequireDefault(_PostResolver);

var _UserResolver = require("./UserResolver.js");

var _UserResolver2 = _interopRequireDefault(_UserResolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = _lodash2.default.merge(_PostResolver2.default, _UserResolver2.default);

exports.default = resolvers;
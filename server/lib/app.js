"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _apolloServerExpress = require("apollo-server-express");

var _apolloServerExpress2 = _interopRequireDefault(_apolloServerExpress);

var _index = require("./graphql/index.js");

var _keys = require("./config/keys.js");

var _keys2 = _interopRequireDefault(_keys);

var _upload = require("./routes/upload.js");

var _validateUser = require("./helper/validateUser.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { getError } from "./constants/statusCode.js";

_mongoose2.default.connect(_keys2.default.KEYS.MongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var ApolloServerExpress = _apolloServerExpress2.default.ApolloServer;
var server = new ApolloServerExpress({
  schema: _index.schema,
  formatError: function formatError(err) {
    console.log(err.message);
    // const error = getError(err.message);
    // TODO: error handling
    // return ({ errorMsg: error.errorMsg, errorCode: error.statusCode });
    return { errorMsg: err.message };
  }
  // context: (({ req }) => {
  //   const token = req.headers.token || '';

  //   if (!token) throw new ApolloServer.AuthenticationError('You must login!');

  //   return { token };
  // })
});

var app = (0, _express2.default)();

app.use(_express2.default.json(), (0, _cors2.default)(), _express2.default.static('upload'));

server.applyMiddleware({ app: app });

app.use('/upload', _upload.uploadRouter); // API for uploading files

app.listen({ port: 4000 }, function () {
  return console.log("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath);
});
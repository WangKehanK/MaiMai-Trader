import express from 'express'
import cors from "cors";
import mongoose from "mongoose";
import ApolloServer from 'apollo-server-express';

import { schema } from './graphql/index.js'
import Config from "./config/keys.js";
import { uploadRouter } from "./routes/upload.js";
import { verifyRouter } from "./routes/verify.js";

import { validateUserToken } from "./helper/validateUser.js";

// import { getError } from "./constants/statusCode.js";

mongoose.connect(Config.KEYS.MongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const ApolloServerExpress = ApolloServer.ApolloServer;
const server = new ApolloServerExpress({
  schema,
  formatError: (err) => {
    console.log(err.message)
    // const error = getError(err.message);
    // TODO: error handling
    // return ({ errorMsg: error.errorMsg, errorCode: error.statusCode });
    return ({ errorMsg: err.message });
  },
  // context: (({ req }) => {
  //   const token = req.headers.token || '';

  //   if (!token) throw new ApolloServer.AuthenticationError('You must login!');

  //   return { token };
  // })
});

const app = express();

app.use(express.json(), cors(), express.static('upload'));

server.applyMiddleware({ app });

app.use('/upload', uploadRouter); // API for uploading files
app.use('/verify', verifyRouter); // API for verify msg

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
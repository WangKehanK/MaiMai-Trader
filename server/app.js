import express from 'express'
import cors from "cors";
import mongoose from "mongoose";
import ApolloServer from 'apollo-server-express';

import { schema } from './graphql/index.js'
import Config from "./config/keys.js";
import { uploadRouter } from "./routes/upload.js";

mongoose.connect(Config.KEYS.MongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   // rootValue: root,
//   graphiql: true,
// }));

const ApolloServerExpress = ApolloServer.ApolloServer;
const server = new ApolloServerExpress({ schema });

const app = express();
app.use(express.json(), cors(), express.static('upload'));

server.applyMiddleware({ app });

app.use('/upload', uploadRouter); // API for uploading files

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
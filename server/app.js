// import express from 'express'
// import graphqlHTTP from 'express-graphql'
// import cors from "cors";
import { schema } from './graphql/index.js'
import mongoose from 'mongoose';
import Config from "./config/keys.js";
import ApolloServer from 'apollo-server';

mongoose.connect(Config.KEYS.MongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.get("/", function (request, response) {
//   response.end("Welcome to the homepage!");
// });

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   // rootValue: root,
//   graphiql: true,
// }));


// app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))

const ApolloServerExpress = ApolloServer.ApolloServer;
const server = new ApolloServerExpress({
  schema,
  cors: true,
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


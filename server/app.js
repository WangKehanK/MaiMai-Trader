import express from 'express'
import graphqlHTTP from 'express-graphql'
import cors from "cors";
import { schema } from './graphql/index.js'

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
  response.end("Welcome to the homepage!");
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  // rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
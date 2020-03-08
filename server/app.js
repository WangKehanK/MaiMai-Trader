var express = require('express');
var graphqlHTTP = require('express-graphql');
var app = express();

var { buildSchema } = require('graphql');
var { userSchema, getUser, retrieveUsers } = require('./routes/users');
var { postSchema, getPost, retrievePosts } = require('./routes/posts');

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (request, response) {
  response.end("Welcome to the homepage!");
});


var schema = buildSchema(`
  type Query {
    user(userId: String!): User
    users(userId: [String]): [User]
    post(postId: String!): Post
    posts(postId: [String]): [Post]
  },
  ${userSchema}
  ${postSchema}
`);

var root = {
  user: getUser,
  users: retrieveUsers,
  post: getPost,
  posts: retrievePosts
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))

module.exports = app;
var express = require('express');
var app = express();

var postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (request, response) {
  response.end("Welcome to the homepage!");
});

module.exports = app;


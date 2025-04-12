const express = require("express");

const app = express();

const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

module.express = app;
// new comment

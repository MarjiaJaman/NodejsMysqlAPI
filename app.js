const express = require("express");
const bodyParser = require("body-parser");

const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/images");

const app = express();

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/comments", commentsRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/images", imageRoute);

module.exports = app;

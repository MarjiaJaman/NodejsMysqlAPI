const express = require("express");
const bodyParser = require("body-parser");

const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/images");
const testRoute = require("./routes/test");

const app = express();

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);
app.use("/test", testRoute);

module.exports = app;

const models = require("../models");
const User = models.User;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };

            User.create(user)
              .then((user) => {
                const token = jwt.sign(
                  {
                    email: user.email,
                    userId: user.id,
                  },
                  process.env.JWT_KEY,
                  function (err, token) {
                    res.status(200).json({
                      message: "Authentication successful!",
                      token: token,
                    });
                  }
                );
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something went wrong!",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function login(req, res) {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication successful!",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Incorrect password!",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function updateProfileImg(req, res) {
  User.findByPk(req.userData.userId).then((user) => {
    User.update(
      { profileImageUrl: "/uploads/" + req.file?.filename },
      { where: { id: user.id } }
    ).then((result) => {
      res.status(201).json({
        message: "Image Updated!",
      });
    });
  });
}

module.exports = {
  signUp: signUp,
  login: login,
  updateProfileImg: updateProfileImg,
};

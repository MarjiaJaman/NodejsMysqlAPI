const models = require("../models");
const User = models.User;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const findUser = await User.findOne({ where: { email: req.body.email } });
    if (findUser) {
      res.status(409).json({
        message: "Email already exists!",
      });
    } else {
      const salting = await bcryptjs.genSalt(10);
      const hashing = await bcryptjs.hash(req.body.password, salting);

      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashing,
      };

      const createUser = await User.create(user);
      if (createUser) {
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
        res.status(500).json({
          message: "Something went wrong!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

async function login(req, res) {
  try {
    const findingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (findingUser === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      bcryptjs.compare(
        req.body.password,
        findingUser.password,
        function (err, result) {
          if (result) {
            const token = jwt.sign(
              {
                email: findingUser.email,
                userId: findingUser.id,
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
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

async function updateProfileImg(req, res) {
  try {
    const user = await User.findByPk(req.userData.userId);

    if (user) {
      const updateUserPic = await User.update(
        { profileImageUrl: "/uploads/" + req.file?.filename },
        { where: { id: user.id } }
      );
      if (updateUserPic) {
        res.status(201).json({
          message: "Image Updated!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

module.exports = {
  signUp: signUp,
  login: login,
  updateProfileImg: updateProfileImg,
};

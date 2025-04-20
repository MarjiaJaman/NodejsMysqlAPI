const Validator = require("fastest-validator");
const models = require("../models");
const { where } = require("sequelize");

function save(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    categoryId: req.body.category_id,
    userId: req.userData.userId,
  };

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(post, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Category.findByPk(req.body.category_id).then((result) => {
    if (result !== null) {
      models.Post.create(post)
        .then((result) => {
          res.status(201).json({
            message: "Post created successfully",
            post: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong",
            error: error,
          });
        });
    } else {
      res.status(400).json({
        message: "Invalid Category ID",
      });
    }
  });
}

function show(req, res) {
  const id = req.params.id;

  models.Post.findByPk(id, {
    include: [
      models.Category,
      models.User,
      {
        model: models.Comment,
        limit: 2,
        order: [["id", "DESC"]],
      },
      {
        model: models.Image,
        order: [["id", "DESC"]],
      },
    ],
  })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function showComments(req, res) {
  const id = req.params.id;

  models.Post.findByPk(id, {
    include: [
      {
        model: models.Comment,
        order: [["id", "DESC"]],
      },
    ],
  })
    .then((result) => {
      if (result) {
        res.status(200).json(result.Comments);
      } else {
        res.status(404).json({
          message: "Post not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function uploadImage(req, res) {
  const id = req.params.id;

  models.Post.findByPk(id).then((post) => {
    if (post !== null) {
      models.Image.create({
        postId: post.id,
        imageUrl: "/uploads/" + req.file.filename,
      })
        .then((result) => {
          res.status(201).json({
            message: "Image Uploaded!",
            image: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong!",
          });
        });
    } else {
      res.status(500).json({
        message: "Invalid Request!",
      });
    }
  });
}

function index(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function update(req, res) {
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    categoryId: req.body.category_id,
  };

  const userId = req.userData.userId;

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(updatedPost, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Category.findByPk(req.body.category_id).then((result) => {
    if (result !== null) {
      models.Post.update(updatedPost, { where: { id: id, userId: userId } })
        .then((result) => {
          res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong!",
            error: error,
          });
        });
    } else {
      res.status(400).json({
        message: "Invalid Category ID",
      });
    }
  });
}

function destroy(req, res) {
  const id = req.params.id;
  const userId = req.userData.userId;

  models.Post.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Post deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    });
}

module.exports = {
  save: save,
  show: show,
  showComments: showComments,
  uploadImage: uploadImage,
  index: index,
  update: update,
  destroy: destroy,
};

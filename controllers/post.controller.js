const Validator = require("fastest-validator");
const models = require("../models");
const Post = models.Post;
const Comment = models.Comment;
const Category = models.Category;
const User = models.User;
const Image = models.Image;

async function save(req, res) {
  try {
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

    const category = await Category.findByPk(req.body.category_id);

    if (category) {
      const createdPost = await Post.create(post);

      if (createdPost) {
        res.status(201).json({
          message: "Post created successfully",
          post: createdPost,
        });
      }
    } else {
      res.status(404).json({
        message: "Category not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

async function show(req, res) {
  try {
    const id = req.params.id;

    const post = await Post.findByPk(id, {
      include: [
        Category,
        User,
        {
          model: Comment,
          limit: 2,
          order: [["id", "DESC"]],
        },
        {
          model: Image,
          order: [["id", "DESC"]],
        },
      ],
    });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

async function showComments(req, res) {
  try {
    const id = req.params.id;

    const post = await Post.findByPk(id, {
      include: [
        {
          model: Comment,
          order: [["id", "DESC"]],
        },
      ],
    });

    if (post) {
      res.status(200).json(post.Comments);
    } else {
      res.status(404).json({
        message: "Post not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

async function uploadImage(req, res) {
  try {
    const id = req.params.id;

    const post = await Post.findByPk(id);

    if (post) {
      const image = await Image.create({
        postId: post.id,
        imageUrl: "/uploads/" + req.file?.filename,
      });

      if (image) {
        res.status(201).json({
          message: "Image Uploaded!",
          image: image,
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Request!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

async function index(req, res) {
  try {
    const getAllPost = await Post.findAll();
    if (getAllPost) {
      res.status(200).json(getAllPost);
    } else {
      res.status(400).json({
        message: "Invalid request!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

async function update(req, res) {
  try {
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

    const category = await Category.findByPk(req.body.category_id);

    if (category) {
      const post = await Post.update(updatedPost, {
        where: { id: id, userId: userId },
      });

      if (post) {
        res.status(200).json({
          message: "Post updated successfully",
          post: updatedPost,
        });
      }
    } else {
      res.status(400).json({
        message: "Category not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function destroy(req, res) {
  try {
    const id = req.params.id;

    const post = await Post.findByPk(id);
    if (post) {
      const destroyPost = await post.destroy();
      if (destroyPost) {
        res.status(200).json({
          message: "Post deleted successfully",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid request!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
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

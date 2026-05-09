const express = require("express");
const postsController = require("../controllers/post.controller");
const checkAuthMiddleware = require("../middleware/check-auth");
const imageUploader = require("../helpers/image-uploader");

const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, postsController.save);
router.get("/", checkAuthMiddleware.checkAuth, postsController.index);
router.get("/:id", postsController.show);
router.get("/:id/comments", postsController.showComments);
router.post(
  "/:id/upload",
  checkAuthMiddleware.checkAuth,
  imageUploader.upload.single("image"),
  postsController.uploadImage
);
router.patch("/:id", checkAuthMiddleware.checkAuth, postsController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, postsController.destroy);

module.exports = router;

const express = require("express");
const imageUploader = require("../helpers/image-uploader");
const userController = require("../controllers/user.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.patch(
  "/:id/upload",
  checkAuthMiddleware.checkAuth,
  imageUploader.upload.single("image"),
  userController.updateProfileImg
);

module.exports = router;

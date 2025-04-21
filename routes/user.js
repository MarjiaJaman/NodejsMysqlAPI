const express = require("express");
const userController = require("../controllers/user.controller");
const checkAuthMiddleware = require("../middleware/check-auth");
const imageUploader = require("../helpers/image-uploader");

const router = express.Router();

router.post("/sign-up", userController.signUp);
router.post("/login", userController.login);
router.patch(
  "/profile-image-upload",
  checkAuthMiddleware.checkAuth,
  imageUploader.upload.single("image"),
  userController.updateProfileImg
);

module.exports = router;

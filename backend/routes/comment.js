// Imports
const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

// Routes
router.post("/:id/new", auth, multer, commentsCtrl.create);
router.get("/:id/comments", auth, commentsCtrl.getComments);
router.delete("/:id/comment/:id", auth, commentsCtrl.deleteComment);

module.exports = router;
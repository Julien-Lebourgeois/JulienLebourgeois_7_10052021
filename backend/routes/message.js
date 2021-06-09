// Imports
const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/message");
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

// Routes
router.post("/add", auth, multer, messagesCtrl.create);
router.get("/messages", messagesCtrl.getAll);
router.delete("/:id", auth, messagesCtrl.deleteMessage);

module.exports = router;
// Imports
const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

// Routes
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.get("/myprofile", auth, usersCtrl.getProfile);
router.delete("/delete", auth, usersCtrl.deleteProfile);
router.put("/update", auth, usersCtrl.updateProfile);

module.exports = router;
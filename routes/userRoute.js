const express = require("express");
const userController = require("../controllers/userController");
const authentication = require('../middleware/authentication')
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/getUser",authentication,userController.getUser);    


module.exports = router;
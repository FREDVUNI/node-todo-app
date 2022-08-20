const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user")

router.post("/sign-up",UserController.signUp)
router.post("/sign-in",UserController.signIn)

module.exports = router

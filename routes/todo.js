const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/todo")
const auth = require("../middleware/auth")

router.get("/",auth,TodoController.items)
router.post("/",auth,TodoController.addTodo)
router.put("/:id",auth,TodoController.completeTodo)
router.patch("/:id",auth,TodoController.updateTodo)
router.delete("/:id",auth,TodoController.deleteTodo)

module.exports = router 


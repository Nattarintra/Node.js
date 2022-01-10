import express from "express"
import { getTodos, getTodoById, createTodos, updateTodos, deleteAllTodos, deleteTodoById } from "../../controllers/todos.js"

const router = express.Router()

//Get All Todos list
router.get("/", getTodos)

// Get single Todo
router.get("/:id", getTodoById)

// Create Todos
router.post("/", createTodos)

// Update todos
router.put("/:id", updateTodos)

// Delete All Task
router.delete("/", deleteAllTodos)

// Delete by Id
router.delete("/:id", deleteTodoById)

export default router

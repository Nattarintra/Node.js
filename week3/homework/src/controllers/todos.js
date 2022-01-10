import data from "../../src/todos.js"
import { v4 as uuidv4 } from "uuid"

// Get All todos Function
export const getTodos = (req, res) => res.json(data)

// Get todos by ID Function
export const getTodoById = (req, res) => {
  let found = data.some(todo => todo.id === parseInt(req.params.id))

  if (found) {
    res.json(data.filter(todo => todo.id === parseInt(req.params.id)))
  } else {
    res.status(404).json({ msg: `No Todos list with ID of ${req.params.id}` })
  }
}
// Create todos Function
export const createTodos = (req, res) => {
  const newData = req.body
  data.push({ id: uuidv4(), ...newData })
  res.json(data)
}

// Update todos by ID Function
export const updateTodos = (req, res) => {
  let found = data.some(todo => todo.id === parseInt(req.params.id))

  if (found) {
    const updateTodo = req.body
    data.forEach(todo => {
      if (todo.id === parseInt(req.params.id)) {
        // chk if newData is updated then show updateTodo : show old data
        todo.statusDone = updateTodo.statusDone ? updateTodo.statusDone : todo.statusDone
        todo.description = updateTodo.description ? updateTodo.description : todo.description

        res.json({ msg: "Todo task updated", todo })
      }
    })
  } else {
    res.status(404).json({ msg: `Task id ${req.params.id} not found` })
  }
}

// Delete All todos Function
export const deleteAllTodos = (req, res) => {
  res.json({ msg: "All Task deleted" })
}

// Delete todos by ID Function
export const deleteTodoById = (req, res) => {
  let found = data.some(todo => todo.id === parseInt(req.params.id))
  if (found) {
    res.json({ msg: "Task deleted", todos: data.filter(todo => todo.id !== parseInt(req.params.id)) })
  } else {
    res.status(404).json({ msg: `No task found with the id of ${req.params.id}` })
  }
}

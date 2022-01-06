/* eslint-disable semi */
"use strict"

// TODO: Write the homework code in this file
const express = require("express")
const app = express()
const data = require("./todos.json")
const uuid = require("uuid")

// Body parse middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Get All Todos list
app.get("/", (req, res) => res.json(data))

// Get single Todo
app.get("/todos/:id", (req, res) => {
  let found = data.some(todo => todo.id === parseInt(req.params.id))

  if (found) {
    res.json(data.filter(todo => todo.id === parseInt(req.params.id)))
  } else {
    res.status(404).json({ msg: `No Todos list with ID of ${req.params.id}` })
  }
})

// Create Todos
app.post("/", (req, res) => {
  // res.send(req.body)

  const newData = {
    id: uuid.v4(),
    statusDone: req.body.statusDone,
    description: req.body.description
  }
  if (!newData.statusDone || !newData.description) {
    return res.status(404).json({ msg: "Please include statusDone and description" })
  }

  data.push(newData)
  res.json(data)
})

// Update todos
app.put("/todos/:id", (req, res) => {
  let found = data.some(todo => todo.id === parseInt(req.params.id))
  if (found) {
    const updateTodo = req.body
    data.forEach(todo => {
      if (todo.id === parseInt(req.params.id)) {
        todo.statusDone = updateTodo.statusDone ? updateTodo.statusDone : todo.statusDone
        todo.description = updateTodo.description ? updateTodo.description : todo.description

        res.json({ msg: "Todo task updated", todo })
      }
    })
  } else {
    res.status(404).json({ msg: `Task id ${req.params.id} not found` })
  }
})

// Delete All Task
app.delete("/todos", (req, res) => {
  res.json({ msg: "All Task deleted" })
})

// Delete by Id
app.delete("/todos/:id", (req, res) => {
  let found = data.some(todo => todo.id === parseInt(req.params.id))
  if (found) {
    res.json({ msg: "Task deleted", todos: data.filter(todo => todo.id !== parseInt(req.params.id)) })
  } else {
    res.status(404).json({ msg: `No task found with the id of ${req.params.id}` })
  }
})

app.listen(3000)

/* eslint-disable semi */
"use strict"

// TODO: Write the homework code in this file

import express from "express"
//import bodyParser from "body-parser"

import todosRoutes from "./routes/api/todos.js"

const app = express()

// Body parse middleware
app.use(express.json())

app.use("/todos", todosRoutes)

// Get home page
app.get("/", (req, res) => res.send("Hi from homepage"))

const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => console.log(`server is runing on http://localhost:${PORT}`))

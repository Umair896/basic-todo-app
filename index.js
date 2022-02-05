import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

// POST API --> check while connecting to react
// app.post("/post", (req, res) => {
//   console.log("Connected to react");
//   res.redirect("/");
// });

// GET API //
const todos = [];
app.get("/api/todos", (req, res) => {
  return res.status(200).send({
    success: true,
    error: null,
    data: {
      todos: todos,
    },
  });
});

// POST API //
app.post("/api/todos", (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).json({
      success: false,
      error: "Please provide the todo",
      data: null,
    });
  }

  const newTodo = {
    id: todos.length + 1,
    text: text,
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    error: null,
    data: {
      todos: newTodo,
    },
  });
  console.log(todos);
});

// DELETE API //
app.delete("/api/todos", (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(500).json({
      success: false,
      error: "Please provide id",
      data: null,
    });
  }

  const findTodo = todos.findIndex((todo) => todo.id == id);
  todos.splice(findTodo, 1);
  return res.send();
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Started server at ${PORT} port`));

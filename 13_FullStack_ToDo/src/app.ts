import { ToDo } from "./todo";
import { parsePriorityFromString, Priority } from "./priority";
import express from "express";

const TODO_ENDPOINT = "/todo(s)?";

const todos: ToDo[] = [new ToDo(0, "TEST", undefined, new Date("2024-06-18T08:04:21.644Z"), Priority.HIGH)];

const app = express();
app.use(express.json());

app.post(TODO_ENDPOINT, (request, response) => {
  const title: string = request.body.title;
  const description: string = request.body.description;
  const dueDate: Date = new Date(request.body.dueDate);
  if (Number.isNaN(dueDate.valueOf())) {
    response.status(400).send("Invalid Date");
    return;
  }
  const priority: Priority = parsePriorityFromString(String(request.body.priority));

  const newId = todos.length;
  const todo = new ToDo(newId, title, description, dueDate, priority);
  todos.push(todo);
  response.status(201).send(todo);
});

app.get(TODO_ENDPOINT, (request, response) => {
  response.send(todos);
});

app.get(`${TODO_ENDPOINT}/:id`, (request, response) => {
  const todo = todos.find((t) => t.id === Number(request.params.id));
  if (todo) {
    response.send(todo);
    return;
  }
  response.status(404).send();
});

app.put(`${TODO_ENDPOINT}/:id`, (request, response) => {
  const todo = todos.find((t) => t.id === Number(request.params.id));
  if (!todo) {
    response.status(404).send();
    return;
  }
  todo.isCompleted = Boolean(request.body.isCompleted);

  response.status(204).send(todo);
});

import { fileURLToPath } from "url";

const folderPath = fileURLToPath(new URL(".", import.meta.url));
app.get("/frontend", (request, response) => {
  response.sendFile("index.html", { root: `${folderPath}/frontend` });
});
app.get("/frontendjs", (request, response) => {
  response.sendFile("index.js", { root: `${folderPath}/frontend` });
});

app.listen(8080);

const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.status(201).send(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) return response.status(400).send();

  const repository = { ...repositories[index], title, url, techs };

  repositories[index] = repository;

  return response.send(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) return response.status(400).send();

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) return response.status(400).send();

  const repository = {
    ...repositories[index],
    likes: repositories[index].likes + 1,
  };

  repositories[index] = repository;

  return response.send(repository);
});

module.exports = app;

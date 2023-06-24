const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const tmdbController = require("./src/controller/tmdb.controller");
const tmdbMiddleWare = require("./src/middleware/tmdb.middleware");
require("dotenv").config();

const tmdb = new tmdbController();
// Parse JSON bodies
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/v1/tmdb/login", async (req, res) => {
  res.send(await tmdb.loginController(req));
});

app.use("/v1/tmdb/", (req, res, next) => {
  const tmdb = new tmdbMiddleWare();

  return tmdb.middleware(req, res, next);
});

app.get("/v1/tmdb/details", async (req, res) => {
  const details = await tmdb.detailsController(req);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

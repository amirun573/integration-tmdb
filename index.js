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
app.use('/public', express.static('public'))


// Define a route handler for generating temporary URL link
app.get('/public/movies/:filename', (req, res) => {
  const fileName = req.params.filename;
  const imagePath = path.join(__dirname, 'public', fileName);

  res.sendFile(imagePath);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/v1/tmdb/signup", async (req, res) => {
  const auth = await tmdb.signUpController(req);

  return res.status(auth.statusCode).json(auth).send();
});

app.post("/v1/tmdb/login", async (req, res) => {
  const auth = await tmdb.loginController(req);

  return res.status(auth.statusCode).json(auth).send();
});

app.use("/v1/tmdb/", (req, res, next) => {
  const tmdb = new tmdbMiddleWare();

  return tmdb.middleware(req, res, next);
});

app.get("/v1/tmdb/fetch/movie", async (req, res) => {
  const details = await tmdb.fetchMovieDataController(req);
  res.send();
});

app.get("/v1/tmdb/items", async (req, res) => {
  const items = await tmdb.itemsController(req);
  return res.status(items.statusCode).json(items).send();
});

app.get("/v1/tmdb/details", async (req, res) => {
  const details = await tmdb.detailsController(req);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

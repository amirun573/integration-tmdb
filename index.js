const express = require("express");
const app = express();
const port = 3000;
require('dotenv').config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/apikey", (req, res) => {

  res.send(process.env.api_key);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

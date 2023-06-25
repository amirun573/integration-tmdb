"use strict";

const { Sequelize, Model, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
  }
);

class Movie extends Model {}
Movie.init(
  {
    movieTitle: DataTypes.STRING,
    description: DataTypes.STRING,
    fileName: DataTypes.STRING,
    originalImagePath: DataTypes.STRING,
    saveImagePath: DataTypes.STRING,
  },
  { sequelize, modelName: "movie" }
);



// Perform the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = Movie;

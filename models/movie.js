"use strict";
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      movieTitle: DataTypes.STRING,
      description: DataTypes.STRING,
      fileName: DataTypes.STRING,
      originalImagePath: DataTypes.STRING,
      saveImagePath: DataTypes.STRING,
    },
    {}
  );
  Movie.associate = function (models) {
    // associations can be defined here
  };
  return Movie;
};

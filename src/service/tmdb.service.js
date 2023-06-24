const axios = require("axios");
const { response } = require("express");
const AuthService = require("./auth.service");
const UserService = require("./user.service");
const fs = require("fs");
const http = require("http");
const https = require("https");
const AWSService = require("./aws.service");

const tmdbUrl = "https://api.themoviedb.org/3/";
const authService = new AuthService();
const userService = new UserService();
const awsService = new AWSService();

const statusService = {
  statusCode: 200,
  status: true,
  messgae: "",
};
class TMDBService {
  constructor() {}

  async loginService(token) {
    const user = await userService.findUserByToken(token);

    if (!user) {
      statusService.statusCode = 400;
      statusService.status = false;
      statusService.messgae = "User Not Found";
      throw statusService;
    }

    const payload = {
      token: user.dataValues.token,
    };

    response.accessToken = await authService.generateAccessToken(payload);
    return response;
  }

  async detailsService(req, res) {}

  async fetchData() {
    const baseImageTMDBUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";
    const url = tmdbUrl + "movie/top_rated?&page=";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.api_key_read}`,
    };

    const movie = {
      movieTitle: null,
      description: null,
      fileName: null,
      originalImagePath: null,
      saveImagePath: null,
    };

    const saveMovie = [];

    for (let i = 1; i <= 1; i++) {
      await axios
        .get(url + i.toString(), { headers })
        .then((response) => {
          const results = response.data.results;

          results.map((result) => {
            const imageUrl = baseImageTMDBUrl + result.poster_path; // Replace with the actual URL of the image
            let buffer = null;
            var config = {
              method: "get",
              url: imageUrl,
              headers: {},
            };

            axios(config)
              .then(function (response) {
                buffer = JSON.stringify(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });

            movie.movieTitle = result.title;
            movie.description = result.overview;
            movie.fileName = result.poster_path;

            saveMovie.push(movie);
          });
        })
        .catch((error) => {
          throw {
            statusCode: 400,
            message: "Not Authenticated.",
          };
        });
    }

    console.log(saveMovie.length);
  }
}

module.exports = TMDBService;

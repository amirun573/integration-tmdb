const axios = require("axios");
const {
  response
} = require("express");
const AuthService = require("./auth.service");
const UserService = require("./user.service");
const MovieService = require("./movie.service");
const fs = require("fs");
const http = require("http");
const https = require("https");
const AWSService = require("./aws.service");

const tmdbUrl = "https://api.themoviedb.org/3/";
const authService = new AuthService();
const userService = new UserService();
const awsService = new AWSService();
const movieService = new MovieService();

const statusService = {
  statusCode: 200,
  status: true,
  messgae: "",
};
class TMDBService {
  constructor() {}

  async loginService(token) {

    try {
      const user = await userService.findUserByToken(token);


      if (!user) {
        // statusService.statusCode = 400;
        // statusService.status = false;
        // statusService.messgae = "User Not Found";
        throw false;
      }


      const payload = {
        token: user.dataValues.token,
      };

      return await authService.generateAccessToken(payload);


    } catch (error) {
      return error;
    }

  }

  async detailsService(req, res) {}

  async fetchData(req) {
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

    let saveMovie = [];

    for (let i = 1; i <= 300; i++) {
      console.log("BATCH==>", i);
      const save = await axios
        .get(url + i.toString(), {
          headers
        })
        .then(async (response) => {
          const results = response.data.results;
          await this.sleep(5000);

          return await Promise.all(
            results.map(async (result) => {
              const movie = {}; // Create a new movie object for each iteration

              const imageUrl = baseImageTMDBUrl + result.poster_path; // Replace with the actual URL of the image

              const fileName = result.poster_path.toString().replace("/", "");

              let imagePath = null;

              const response = await axios.get(imageUrl, {
                responseType: "arraybuffer",
              });

              if (!response.data) {
                next();
              }
              const buffer = response.data;

              imagePath = await awsService.saveImage({
                fileName,
                buffer
              });

              movie.movieTitle = result.title;
              movie.description = result.overview;
              movie.fileName = result.poster_path;
              movie.originalImagePath = imageUrl;
              movie.saveImagePath = req.headers.host + "/" + imagePath;

              return movie;
            })
          );
        })
        .catch((error) => {
          throw {
            statusCode: 400,
            message: "Not Authenticated.",
          };
        });

      saveMovie = saveMovie.concat(save);
    }

    return await movieService.saveMovieBulk(saveMovie);
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async movieItems(body) {
    try {
      return movieService.movieList(body);

    } catch (error) {
      return error;
    }
  }
}

module.exports = TMDBService;
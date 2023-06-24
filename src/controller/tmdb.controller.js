const tmdbService = require("../service/tmdb.service");
const Joi = require("joi");

const tmdb = new tmdbService();

const response = {
  statusCode: 200,
  message: "Sucess",
};
class TMDBController {
  constructor() {}

  async loginController(req, res) {
    try {
      const bodySchema = Joi.object({
        token: Joi.string().required(),
      });

      // Validate the request body
      const { value, error } = bodySchema.validate(req.body);

      if (error) {
        // Validation failed, send an error response
        response.statusCode = 400;
        response.message = error.message;
        throw response;
      }

      const { token } = value;

      const user = await tmdb.loginService(token);

      if (!user) {
        response.statusCode = 400;
        response.message = user?.message;

        throw response;
      }

      return user;
    } catch (error) {
      return error;
    }
  }

  async fetchMovieDataController(req, res) {
    return await tmdb.fetchData();
  }

  async detailsController(req, res) {
    return await tmdb.detailsService();
  }
}

module.exports = TMDBController;

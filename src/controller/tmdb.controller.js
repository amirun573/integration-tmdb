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

      return await tmdb.loginService(token);
    } catch (error) {
      return response;
    }
  }

  async detailsController(req, res) {
    const body = req.query;

    return await tmdb.detailsService();
  }
}

module.exports = TMDBController;

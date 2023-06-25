const tmdbService = require("../service/tmdb.service");
const Joi = require("joi");
const AuthService = require("../service/auth.service")
const UserService = require("../service/user.service")

const tmdb = new tmdbService();
const authService = new AuthService();
const userService = new UserService();

let response = {
  statusCode: 200,
  message: "Sucess",
};
class TMDBController {
  constructor() {}

  async signUpController(req, res) {
    try {

      response = {
        statusCode: 200,
        message: "Sucess",
      };

      const bodySchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        token: Joi.string().required(),
      });

      // Validate the request body
      const {
        value,
        error
      } = bodySchema.validate(req.body);

      if (error) {
        // Validation failed, send an error response
        response.statusCode = 400;
        response.message = error.message;
        throw response;
      }

      const {
        email,
        name,
        token
      } = value;

      const checkToken = await userService.findUserByToken(token);


      if (checkToken != null) {
        response.statusCode = 400;
        response.message = "Token Exist.";
        throw response;
      }


      const user = await authService.signUp(value);

      if (!user) {
        response.statusCode = 400;
        response.message = "Failed To Create Client.";
        throw response;
      }

      response.data = {
        user
      };

      return response;
    } catch (error) {
      return error;
    }


  }

  async loginController(req, res) {
    try {

      response = {
        statusCode: 200,
        message: "Sucess",
      };

      const bodySchema = Joi.object({
        token: Joi.string().required(),
      });

      // Validate the request body
      const {
        value,
        error
      } = bodySchema.validate(req.body);

      if (error) {
        // Validation failed, send an error response
        response.statusCode = 400;
        response.message = error.message;
        throw response;
      }

      const {
        token
      } = value;

      const user = await tmdb.loginService(token);

      console.log("USer==>", user);
      if (!user) {
        response.statusCode = 400;
        response.message = user.message;
        throw response;
      }
      response.accessToken = user;

      return response;
    } catch (error) {
      return error;
    }
  }

  async fetchMovieDataController(req, res) {
    return await tmdb.fetchData(req);
  }

  async detailsController(req, res) {
    return await tmdb.detailsService();
  }

  async itemsController(req, res) {
    try {

      response = {
        statusCode: 200,
        message: "Sucess",
      };
      const items = await tmdb.movieItems(req.query);

      if (!items) {
        response.statusCode = 400;
        response.message = error.message;
        throw response;
      }

      response.data = items;
      return response;
    } catch (error) {
      return error;
    }


  }


}

module.exports = TMDBController;
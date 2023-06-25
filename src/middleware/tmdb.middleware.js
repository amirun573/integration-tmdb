const axios = require("axios");

const tmdbUrl = "https://api.themoviedb.org/3/";

const jwt = require("jsonwebtoken");
const AuthService = require("../service/auth.service");
const authService = new AuthService();

const UserService = require("../service/user.service");
const userService = new UserService();
class TMDBMiddleWare {
  async middleware(req, res, next) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw {
          statusCode: 400,
          message: "Not Authenticated with Access Token.",
        };
      }

      const auth = await authService.validateAccessToken(authorization);

      if (!auth) {
        throw {
          statusCode: 400,
          message: "JWT Not Authenticate.",
        };
      }

      const user = await userService.findUserByToken(auth?.token);

      if (!user) {
        throw {
          statusCode: 400,
          status: false,
          message: "User Not Found",
        };
      }

      req.user = user;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.api_key_read}`,
      };

      await axios
        .get(tmdbUrl + "authentication/token/new", { headers })
        .then((response) => {})
        .catch((error) => {
          throw {
            statusCode: 400,
            message: "Not Authenticated.",
          };
        });

      next();
    } catch (error) {
      console.log("Error==>", error);
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}

module.exports = TMDBMiddleWare;

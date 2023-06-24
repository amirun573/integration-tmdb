const axios = require("axios");
const { response } = require("express");
const tmdbUrl = "https://api.themoviedb.org/3/";
const AuthService = require("./auth.service");
const authService = new AuthService();
const UserService = require("./user.service");
const userService = new UserService();
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
}

module.exports = TMDBService;

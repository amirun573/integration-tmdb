const axios = require("axios");
//const User = require("../../models/user/user.model");
const tmdbUrl = "https://api.themoviedb.org/3/";

class TMDBService {
  constructor() {}

  async loginService(token) {
    try {
      // return await User.findAll({
      //   where: {
      //     token,
      //   },
      // })
      //   .then((user) => {
      //     console.log("User==>", user);
      //     if (user) {
      //       console.log("User found:", user);
      //     } else {
      //       console.log("User not found.");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error retrieving user:", error);
      //   });
    } catch (error) {
      console.log(error);
    }
  }

  async detailsService(req, res) {}
}

module.exports = TMDBService;

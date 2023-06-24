const axios = require("axios");

const tmdbUrl = "https://api.themoviedb.org/3/";

class TMDBMiddleWare {
  async middleware(req, res, next) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.api_key_read}`,
      };

      await axios
        .get(tmdbUrl + "authentication/token/new", { headers })
        .then((response) => {

            console.log("Response==>",response);
          next();
        })
        .catch((error) => {
          throw {
            statusCode: 400,
            message: "Not Authenticated.",
          };
        });
    } catch (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}

module.exports = TMDBMiddleWare;

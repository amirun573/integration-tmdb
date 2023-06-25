const Movie = require("../../models/movie");

class MovieService {
  constructor() {}

  async findMovieById(id) {
    return await Movie.findOne({
      where: {
        id,
      },
    });
  }

  async movieList(body) {
    const limit = parseInt(body.limit) || 10;
    const offset = (parseInt(body.page) - 1) * limit || 0;

    // Query the database with pagination options
    return await Movie.findAll({
      limit,
      offset,
    });
  }

  async saveMovieBulk(body) {
      try {
        return await Movie.bulkCreate(body);

      } catch (error) {
          console.log("Error==>", error);
      }
  }
}
module.exports = MovieService;

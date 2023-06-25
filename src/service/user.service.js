const User = require("../../models/user");

class UserService {
  constructor() {}

  async findUserByToken(token) {
    return await User.findOne({
      where: {
        token,
      },
    });
  }
}

module.exports = UserService;

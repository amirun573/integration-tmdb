const User = require("../../models/user");

class UserService {
  constructor() {}

  async findUserByToken(token) {
    try {
      return await User.findOne({
        where: {
          token,
        },
      });
    } catch (error) {
      console.log("Error==>",error);
      return error;
    }
    
  }
}

module.exports = UserService;

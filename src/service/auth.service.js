const jwt = require("jsonwebtoken");
const { split } = require("lodash");

const UserService = require("./user.service");
const User = require("../../models/user");
const userService = new UserService();

class AuthService {
  constructor() {}

  async generateAccessToken(payload) {
    const token = jwt.sign(payload, process.env.secret_key_auth, {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    return token;
  }

  async validateAccessToken(authorization) {
    try {
      const bearerToken = split(authorization, " ");

      if (bearerToken.length != 2) {
        throw {
          message: "Not Bearer Token Format.",
        };
      }

      const secretKey = process.env.secret_key_auth;
      const token = bearerToken[1];

      const verify = jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          // Token verification failed
          return false;
        } else {
          // Token is valid
          return decoded;
        }
      });

      return verify;
    } catch (error) {
      return error;
    }
  }

  async signUp(body){
    return User.create(body);
  }
}

module.exports = AuthService;

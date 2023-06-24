const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index"); // Assuming you have a separate database configuration file

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Specify the table name if it differs from the model name
  }
);

module.exports = User;

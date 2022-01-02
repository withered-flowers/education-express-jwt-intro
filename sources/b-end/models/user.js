"use strict";
const { Model } = require("sequelize");
// Jangan lupa untuk mengimpor helper bcrypt di sini
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // Menambahkan hook beforeCreate di sini
  User.beforeCreate((instanceUser, options) => {
    // mengganti password dengan yang sudah dihash
    instanceUser.password = hashPassword(instanceUser.password);
  });
  return User;
};

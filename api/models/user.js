"use strict";
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");

// FIXME: 원래 이런 보안정보는 환경변수 등의 수단으로 잘 숨겨서 관리해야한다. 예제인것 감안할것.
const jwtSecret = "thisisdemoapp";

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

    signToken() {
      return jwt.sign({ userId: this.id }, jwtSecret);
    }

    static decodeToken(token) {
      return jwt.verify(token, jwtSecret);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

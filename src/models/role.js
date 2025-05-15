const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Roles = sequelize.define(
  "Role",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps:true,
    underscored: true,
  }
);

module.exports = Roles;
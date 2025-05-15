const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const bcrypt = require("bcrypt");
const Roles = require("./role");

const Users = sequelize.define(
  "User",
  {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    verify_account_token: {
      type: DataTypes.STRING,
    },
    verify_account_expires: {
      type: DataTypes.STRING,
    },
    // verify_password_token: {
    //   type: DataTypes.STRING,
    // },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
      references: {
        model: Roles,
        key: "id",
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dob: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
    deleted_by: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
    paranoid: true,
    hooks: {
      // beforeCreate:(user)=>{
      //     user.updated_at=null
      // }

      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

module.exports = Users;

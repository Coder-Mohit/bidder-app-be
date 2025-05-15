const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Roles = require("./role");
const Users = require("./user");

const AuctionCategory = sequelize.define(
  "AuctionCategory",
  {
    name: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description: {
        type:DataTypes.TEXT,
        allowNull:false
    },
    icon: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    created_by: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Users,
            key:'id'
        }
    },
    updated_by: {
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:null,
        references:{
            model:Users,
            key:'id'
        }
    },
    deleted_by: {
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:null,
        references:{
            model:Users,
            key:'id'
        }
    },
    updated_at: {
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue:null
    },
  },
  {
    tableName: "auction_category",
    paranoid: true,
    underscored: true,
    hooks: {
      beforeCreate: (info) => {
        info.updated_at = null;
      },
    },
  }
);

module.exports = AuctionCategory;
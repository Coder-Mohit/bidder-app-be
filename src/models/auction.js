const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Users = require("./user");
const AuctionCategory = require("./auctionCategory");

const Auction = sequelize.define(
  "Auction",
  {
   item_name: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    base_price: {
        type:DataTypes.FLOAT,
        allowNull:false
    },
    description: {
        type:DataTypes.TEXT,
        allowNull:false,
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("pending","active","completed","rejected"),
        defaultValue:"pending"
    },
    rejected_reason:{
        type:DataTypes.TEXT,
    },
    category_id:{
        type:DataTypes.INTEGER,
        references:{
            model:AuctionCategory,
            key:'id'
        },
        allowNull:false
    },
    images:{
        type:DataTypes.JSON,
        allowNull:false
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
  },
  {
    tableName: "auctions",
    paranoid: true,
    underscored: true,
  }
);

module.exports = Auction;
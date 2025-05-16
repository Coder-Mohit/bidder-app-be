const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Users = require("./user");
const Auction = require("./auction");

const Bid = sequelize.define(
  "Bid",
  {
    user_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Users,
        key: "id",
      },
      allowNull: false,
    },
    auction_id: {
        type:DataTypes.INTEGER,
        references:{
            model:Auction,
            key:'id'
        }
    },
    bid_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bid_status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "bids",
    paranoid: true, //soft delete
    hooks:{
        beforeCreate:(bid)=>{
            bid.updated_at = null
        }
    }
  }
);

module.exports = Bid;
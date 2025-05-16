const Auction = require("./models/auction");
const AuctionCategory = require("./models/auctionCategory");
const Roles = require("./models/role");
const Users = require("./models/user");

// role and user
Roles.hasMany(Users, {
  foreignKey: "role_id",
  as: "users",
});

Users.belongsTo(Roles, {
  foreignKey: "role_id",
  as: "role",
});

// user and auction
Users.hasMany(Auction, { foreignKey: "created_by", as: "createdAuctions" });
Auction.belongsTo(Users, { foreignKey: "created_by", as: "creator" });

// auction_category and auctions
AuctionCategory.hasOne(Auction, { foreignKey: "category_id", as: "auction" });
Auction.belongsTo(AuctionCategory, {
  foreignKey: "category_id",
  as: "category",
});

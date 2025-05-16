const Auction = require("../models/auction");
const AuctionCategory = require("../models/auctionCategory");
const Bid = require("../models/bid");
const Roles = require("../models/role");
const Users = require("../models/user");

const tableSync = async () => {
  try {
    await Roles.sync();
    await Users.sync();
    await AuctionCategory.sync();
    await Auction.sync();
    await Bid.sync();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };

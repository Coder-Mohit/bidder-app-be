const { Op } = require("sequelize");
const Auction = require("../../models/auction");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
const Users = require("../../models/user");
const AuctionCategory = require("../../models/auctionCategory");

const createAuction = async (auctionData, userId) => {
  try {
    const auctionDetail = await Auction.create({
      ...auctionData,
      created_by: userId,
    });
    return auctionDetail;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAuction = async (auctionId, userId, auctionData) => {
  try {
    //find auction by id and ensure the user is creator
    const auction = await Auction.findOne({
      where: {
        id: auctionId,
        created_by: userId,
      },
    });
    if (!auction) {
      throw new Error(ERROR_MESSAGE.AUCTION_NOT_FOUND);
    }

    //update auction filled and reset status to 'pending'
    const updatedAuction = await auction.update({
      ...auctionData,
      status: "pending",
      updated_by: userId,
    });
    return updatedAuction;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getActiveAuctions = async (filters) => {
  try {
    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      sortBy = "asc",
      categoryId,
    } = filters;
    const offset = (page - 1) * limit;
    const currentDate = new Date();

    // Build dynamic filter options
    const whereClause = {
      status: "active",
      end_date: { [Op.gt]: currentDate },
    };

    if (minPrice) {
      whereClause.base_price = {
        [Op.gt]: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      whereClause.base_price = {
        ...whereClause.base_price, //  [Op.gt]:parseFloat(minPrice)
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    if (categoryId) {
      whereClause.category_id = categoryId;
    }

    const { rows: auctions, count: total } = await Auction.findAndCountAll({
      where: whereClause,
      attributes: [
        "id",
        "item_name",
        "base_price",
        "description",
        "start_date",
        "end_date",
        "images",
        "updated_at",
        "created_at",
      ],
      include: [
        {
          model: Users,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "email", "dob"],
        },
        {
          model: AuctionCategory,
          as: "category",
          attributes: ["id", "name", "description"],
        },
      ],
      limit,
      offset,
      order: [["base_price", sortBy === "asc" ? "ASC" : "DESC"]], // order by on end date ascending
    });
    return {
      auctions,
      pagination: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAuctionById = async (id) => {
  try {
    const auction = await Auction.findByPk(id, {
      attributes: [
        "id",
        "item_name",
        "base_price",
        "description",
        "status",
        "start_date",
        "end_date",
        "images",
        "updated_at",
        "created_at",
      ],
      include: [
        {
          model: Users,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "email", "dob"],
        },
        {
          model: AuctionCategory,
          as: "category",
          attributes: ["id", "name", "description"],
        },
      ],
    });
    return auction;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMyAuctions = async (filters) => {
  try {
    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      sortBy = "asc",
      categoryId,
      status = "active",
      userId,
    } = filters;
    const offset = (page - 1) * limit;

    // Build dynamic filter options
    const whereClause = {
      status:status,
      created_by:userId,
    };

    if (minPrice) {
      whereClause.base_price = {
        [Op.gt]: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      whereClause.base_price = {
        ...whereClause.base_price, //  [Op.gt]:parseFloat(minPrice)
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    if (categoryId) {
      whereClause.category_id = categoryId;
    }

    const { rows: auctions, count: total } = await Auction.findAndCountAll({
      where: whereClause,
      attributes: [
        "id",
        "item_name",
        "base_price",
        "description",
        "start_date",
        "end_date",
        "images",
        "updated_at",
        "created_at",
      ],
      include: [
        {
          model: Users,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "email", "dob"],
        },
        {
          model: AuctionCategory,
          as: "category",
          attributes: ["id", "name", "description"],
        },
      ],
      limit,
      offset,
      order: [["base_price", sortBy === "asc" ? "ASC" : "DESC"]], // order by on end date ascending
    });
    console.log(auctions);
    
    return {
      auctions,
      pagination: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.log(error.message);
    
    throw new Error(error.message);
  }
};

module.exports = {
  createAuction,
  updateAuction,
  getActiveAuctions,
  getAuctionById,
  getMyAuctions
};

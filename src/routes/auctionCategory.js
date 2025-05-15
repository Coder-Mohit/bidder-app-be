const express = require("express");
const validateSchema = require("../middlewares/validator");
const auctionCategoryRouter = express.Router();
const auctionCategoryController = require("../controllers/auctionCategory/index");
const auctionCategorySchema = require("../middlewares/validationSchema/auctionCategory");
const authenticateToken = require("../middlewares/authMiddleware");

auctionCategoryRouter
  .get("/",authenticateToken, auctionCategoryController.allAuctionCategory)
  .post(
    "/create",
    validateSchema(auctionCategorySchema),
    authenticateToken,
    auctionCategoryController.createAuctionCategory
  );

module.exports = auctionCategoryRouter;

const express = require("express");
const validateSchema = require("../middlewares/validator");
const auctionRouter = express.Router();
const auctionController = require("../controllers/auction/index");
const createAuctionSchema = require("../middlewares/validationSchema/createAuction");
const authenticateToken = require("../middlewares/authMiddleware");

auctionRouter
  .get("/",authenticateToken, auctionController.allAuction)
  .post(
    "/create",
    validateSchema(createAuctionSchema),
    authenticateToken,
    auctionController.createAuction
  );

module.exports = auctionRouter;

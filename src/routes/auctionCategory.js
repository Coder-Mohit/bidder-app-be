const express = require("express");
const validateSchema = require("../middlewares/validator");
const auctionCategoryRouter = express.Router();
const auctionCategoryController = require('../controllers/auctionCategory/index');
const auctionCategorySchema = require("../middlewares/validationSchema/auctionCategory");

auctionCategoryRouter
  .post('/create',validateSchema(auctionCategorySchema),auctionCategoryController.createAuctionCategory);


module.exports = auctionCategoryRouter;
 
const express = require("express");
const validateSchema = require("../middlewares/validator");
const auctionRouter = express.Router();
const auctionController = require("../controllers/auction/index");
const createAuctionSchema = require("../middlewares/validationSchema/createAuction");
const authenticateToken = require("../middlewares/authMiddleware");

auctionRouter
  .post(
    "/create",
    validateSchema(createAuctionSchema),
    authenticateToken,
    auctionController.createAuction
  )
  .put("/update/:id",validateSchema(createAuctionSchema),authenticateToken,auctionController.updateAuction)
  .get("/", auctionController.getActiveAuctions)
  .get("/auction-detail/:id",auctionController.getAuctionDetailById)
  .get("/my-auction", authenticateToken ,auctionController.getMyAuctions);


module.exports = auctionRouter;

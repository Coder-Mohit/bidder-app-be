const express = require("express");
const validateSchema = require("../middlewares/validator");
const bidRouter = express.Router();
const bidController = require("../controllers/bid/index");
const createBidSchema = require("../middlewares/validationSchema/createBid");
const authenticateToken = require("../middlewares/authMiddleware");

bidRouter.post(
  "/create",
  validateSchema(createBidSchema),
  authenticateToken,
  bidController.createBid
);
//   .put("/update/:id",validateSchema(createAuctionSchema),authenticateToken,auctionController.updateAuction)
//   .get("/", auctionController.getActiveAuctions)
//   .get("/auction-detail/:id",auctionController.getAuctionDetailById)
//   .get("/my-auction", authenticateToken ,auctionController.getMyAuctions);

module.exports = bidRouter;

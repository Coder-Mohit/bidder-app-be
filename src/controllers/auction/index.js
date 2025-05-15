const auctionService = require("../../service/auction/auctionService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const createAuction = async (req, res) => {
  try {
    const {role_id} = req.user;
    if(role_id === 1){
        return sendErrorResponse(res,ERROR_MESSAGE.UNAUTHORIZED_USER,"",500)
    }
    const result = await auctionCategoryService.saveAuctionCategory(req.body);
    sendSuccessResponse(
      res,
      SUCCESS_MESSAGE.AUCTION_CATEGORY_CREATED,
      result,
      200
    );
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

module.exports = {createAuction}
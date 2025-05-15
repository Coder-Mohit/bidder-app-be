const AuctionCategory = require("../../models/auctionCategory");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const saveAuctionCategory = async(auctionDetails)=>{
    try {
        const {name} = auctionDetails;
        const isAuctionCategoryPresent = await AuctionCategory.findOne({
            where:{name}
        })
        if(isAuctionCategoryPresent){
            throw new Error(ERROR_MESSAGE.AUCTION_CATEGORY_EXIST)
        }

        //save category in db
        const auctionCategoryDetails = await AuctionCategory.create(
            {
                ...auctionDetails,
                created_by:10, //need to change
            }
        )
        return auctionCategoryDetails;
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {saveAuctionCategory}
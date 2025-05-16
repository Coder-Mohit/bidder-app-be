const AuctionCategory = require("../../models/auctionCategory");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const saveAuctionCategory = async(auctionDetails,userId)=>{
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
                created_by:userId, //need to change
            }
        )
        return auctionCategoryDetails;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllAuctionCategory = async()=>{
    try {
        const auctionCategoryList = await AuctionCategory.findAll();
        return auctionCategoryList;
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {saveAuctionCategory,getAllAuctionCategory}
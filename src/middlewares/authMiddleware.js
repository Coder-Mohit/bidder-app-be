const { ERROR_MESSAGE } = require("../utils/propertyResolver");
const { sendErrorResponse } = require("../utils/response");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return sendErrorResponse(res, ERROR_MESSAGE.TOKEN_REQUIRED, "", 400);
  }

  try {
    //verify token
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedValue);
    if(!decodedValue.user_status) {
      return sendErrorResponse(res, ERROR_MESSAGE.USER_NOT_ACTIVE, "", 400);
    }

    req.user = {
      id: decodedValue.id,
      role_id: decodedValue.role_id,
      user_status: decodedValue.user_status,
    };

    next();
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      400
    );
  }
};

module.exports = authenticateToken;

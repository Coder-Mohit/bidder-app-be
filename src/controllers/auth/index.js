const authService = require("../../service/auth/authService");

const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  try {
    const accountToken = uuidv4();
    const accountTokenExpiry = Date.now() + 3600000; //tpken valid for 1hr

    const userInfo = await authService.saveUser({
      ...req.body,
      verify_account_token: accountToken,
      verify_account_expires: accountTokenExpiry,
    });
    // return res.send(userInfo)
    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_CREATE, userInfo, 200);
  } catch (error) {
    // return res.send(error.message)
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAG.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
    }
    const result = await authService.verifyAccountToken(token);

    sendSuccessResponse(res, SUCCESS_MESSAGE.ACCOUNT_VERIFIED, result, 200);
  } catch (error) {
    console.log(error.message);

    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, remember_password } = req.body;
    const result = await authService.loginUser(
      email,
      password,
      remember_password
    );
    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_LOGIN, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};


const forgotPassword = async(req,res)=>{
  try {
    const token = uuidv4();
    const tokenExpiryTime = Date.now() + 3600000;

    const result = await authService.forgotPassword(req.body.email,token,tokenExpiryTime)

    sendSuccessResponse(res,SUCCESS_MESSAGE.FORGOT_EMAIL_SEND,result,200)

  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
}

const updatePassword = async (req,res)=>{
  try {
    const {token} = req.params;
    const {password} = req.body;

    if(!token){
      throw new Error(ERROR_MESSAGE.INVALID_TOKEN)
    }

    const result = await authService.resetUserPassword(token,password);
    sendSuccessResponse(res,SUCCESS_MESSAGE.PASSWORD_UPDATED,result,200)

  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
}

module.exports = { registerUser, verifyAccount, loginUser,forgotPassword, updatePassword };

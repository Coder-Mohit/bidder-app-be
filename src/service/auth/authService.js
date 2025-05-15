const jwt = require("jsonwebtoken");
const { error } = require("../../middlewares/validationSchema/registerUser");
const Users = require("../../models/user");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
const bcrypt = require("bcrypt");
const sendMail = require("../mail/mailService");
const { Op } = require("sequelize");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const saveUser = async (userDetails) => {
  try {
    const { email, verify_account_token, first_name } = userDetails;
    console.log(email);

    const isEmailPresent = await Users.findOne({ where: { email } });

    if (isEmailPresent) {
      throw new Error(ERROR_MESSAGE.EMAIL_ALREADY_EXIST);
    }
    const result = await Users.create(userDetails);
		const verifyAccountUrl = `verify-account?token=${verify_account_token}`;
		const contentHtml = `<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Account Verification</title>
				<style>
						body {
								font-family: Arial, sans-serif;
								background-color: #f4f4f4;
								padding: 20px;
								margin: 0;
						}
		
						.email-container {
								max-width: 600px;
								margin: 0 auto;
								background-color: #ffffff;
								border-radius: 8px;
								overflow: hidden;
								box-shadow: 0 2px 8px rgba(0,0,0,0.1);
						}
		
						.email-header {
								background-color: #007BFF;
								color: white;
								padding: 20px;
								text-align: center;
						}
		
						.email-body {
								padding: 20px;
								color: #333333;
						}
		
						.email-body p {
								line-height: 1.6;
						}
		
						.verification-button {
								display: inline-block;
								margin-top: 20px;
								padding: 12px 24px;
								background-color: #28a745;
								color: white;
								text-decoration: none;
								border-radius: 5px;
								font-weight: bold;
						}
		
						.verification-button:hover {
								background-color: #218838;
						}
		
						.email-footer {
								background-color: #f1f1f1;
								padding: 15px 20px;
								text-align: center;
								font-size: 14px;
								color: #666666;
						}
		
						.email-footer a {
								color: #007BFF;
								text-decoration: none;
						}
		
						.email-footer a:hover {
								text-decoration: underline;
						}
				</style>
		</head>
		<body>
				<div class="email-container">
						<div class="email-header">
								<h1>Account Verification</h1>
						</div>
		
						<div class="email-body">
								<p>Hello ${first_name}, Welcome to Bidder App</p>
								<p>Thank you for registering with us! To complete your account setup, please click the button below:</p>
								<a href="${verifyAccountUrl}" class="verification-button">Verify My Email</a>
						</div>
		
						<div class="email-footer">
								<p>For any queries, <a href="mailto:mohitrathor89528@gmail.com">contact us</a>.</p>
						</div>
				</div>
		</body>
		</html>`;
		await sendMail(email,"verify your account",contentHtml)
    return result;
  } catch (error) {
    console.log(error.message);

    throw new Error(error.message);
  }
};

const verifyAccountToken = async (token) => {
  try {
    const user = await Users.findOne({
      where: {
        verify_account_token: token,
      },
    });
    if (!user) throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
    const currentTime = new Date();
    const expirationTime = user.verify_account_expires;
    const formattedCurrentTime = currentTime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    if (formattedCurrentTime > expirationTime) {
      throw new Error(error.message);
    }

    await user.update({
      is_active: true,
      verify_account_token: null,
      verify_account_expires: null,
    });
    return user.id;
  } catch (error) {
    console.log(error.message);

    throw new Error();
  }
};

const loginUser = async (email, password, remember_password) => {
  try {
    const user = await Users.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error(ERROR_MESSAGE.INVALID_EMAIL_PASSWORD);
    }

		if(!user.is_active){
			throw new Error(ERROR_MESSAGE.USER_NOT_ACTIVE)
		}

    const isMatchPassword = await bcrypt.compare(password, user.password);
		console.log(isMatchPassword);
		
    if (!isMatchPassword) throw new Error(ERROR_MESSAGE.INVALID_EMAIL_PASSWORD);

    const tokenExpiry = remember_password ? "7d" : "24h";
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role_id: user.role_id,
        user_status: user.is_active,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: tokenExpiry,
      }
    );
		return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const forgotPassword = async(email,token,tokenExpiryTime)=>{
	try {
		const user = await Users.findOne({
			where:{email}
		})

		if(!user){
			throw new Error(ERROR_MESSAGE.USER_NOT_FOUND)
		}

		await user.update({
      verify_account_token: token,
      verify_account_expires: tokenExpiryTime,
    });

		const updatePasswordUrl = `/forgot-password?token=${token}`;
		const contentHtml = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Update your Password</title>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f4f4f4;
					padding: 20px;
					margin: 0;
				}
		
				.email-container {
					max-width: 600px;
					margin: 0 auto;
					background-color: #ffffff;
					border-radius: 8px;
					overflow: hidden;
					box-shadow: 0 2px 8px rgba(0,0,0,0.1);
				}
		
				.email-header {
					background-color: #dc3545;
					color: white;
					padding: 20px;
					text-align: center;
				}
		
				.email-body {
					padding: 20px;
					color: #333333;
				}
		
				.email-body p {
					line-height: 1.6;
				}
		
				.reset-button {
					display: inline-block;
					margin-top: 20px;
					padding: 12px 24px;
					background-color: #007BFF;
					color: white;
					text-decoration: none;
					border-radius: 5px;
					font-weight: bold;
				}
		
				.reset-button:hover {
					background-color: #0056b3;
				}
		
				.email-footer {
					background-color: #f1f1f1;
					padding: 15px 20px;
					text-align: center;
					font-size: 14px;
					color: #666666;
				}
		
				.email-footer a {
					color: #007BFF;
					text-decoration: none;
				}
		
				.email-footer a:hover {
					text-decoration: underline;
				}
			</style>
		</head>
		<body>
			<div class="email-container">
				<div class="email-header">
					<h1>Password Reset</h1>
				</div>
		
				<div class="email-body">
					<p>Hello ${user.first_name},</p>
					<p>We received a request to reset your password. If this was you, click the button below to reset it. If you didn’t request a password reset, you can safely ignore this email.</p>
					<a href="${updatePasswordUrl}" class="reset-button">Reset My Password</a>
				</div>
		
				<div class="email-footer">
					<p>Need help? <a href="mailto:mohitrathor89528@gmail.com">Contact us</a>.</p>
				</div>
			</div>
		</body>
		</html>`;
		
		await sendMail(email,"Update Password",contentHtml)
		return user.id;
	} catch (error) {
		
	}
}

const resetUserPassword = async(token,password)=>{
	try {
		//st:1 find user details with provided token
		const user = await Users.findOne({
			where:{
				verify_account_token:token,
				verify_account_expires:{
					[Op.gt] : Date.now()
				}
			}
		})

		//st:2 if no user is found or the token invalid/expired 
		if(!user) throw new Error(ERROR_MESSAGE.INVALID_TOKEN)

		//st:3 encrypt new password
		const encryptedPassword = await bcrypt.hash(password,user.password)

		//st:4 update the users information in db
		const updatedUserInfo = await user.update({
			password:encryptedPassword,
			verify_account_token:null,
			verify_account_expires:null,
			is_active:true,
			updated_by:user.id
		})

		return user.id;
		
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = { saveUser, verifyAccountToken, loginUser ,forgotPassword, resetUserPassword};

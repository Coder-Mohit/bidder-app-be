const express = require("express");
const authController = require("../controllers/auth/index");
const validateSchema = require("../middlewares/validator");
const registerSchema = require("../middlewares/validationSchema/registerUser");
const loginSchema = require("../middlewares/validationSchema/loginUser");
const resetPasswordSchema = require("../middlewares/validationSchema/resetPassword");
const forgotPasswordSchema = require("../middlewares/validationSchema/forgotPassword");
const authRouter = express.Router();

authRouter
  .post(
    "/register",
    validateSchema(registerSchema),
    authController.registerUser
  )
  .get("/verify-account/:token", authController.verifyAccount)
  .post("/login",validateSchema(loginSchema),authController.loginUser)
  .post("/forgot-password",validateSchema(forgotPasswordSchema), authController.forgotPassword)
  .post("/reset-password/:token",validateSchema(resetPasswordSchema),authController.updatePassword)
module.exports = authRouter;
 
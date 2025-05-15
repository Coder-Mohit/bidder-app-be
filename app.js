
const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const Roles = require("./src/models/role");
const Users = require("./src/models/user");
const indexRouter = require("./src/routes");
const AuctionCategory = require("./src/models/auctionCategory");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(cors());

app.use("/api", indexRouter);

app.listen(PORT, async () => {
  try {
    console.log("server is running on ", PORT);
    await sequelize.authenticate();
    console.log("Db connetion has been established successfully");
    await Roles.sync();
    await Users.sync();
    await AuctionCategory.sync();
  } catch (error) {
    console.error("ERROR", error.message);
  }
});

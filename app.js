
const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const indexRouter = require("./src/routes");
const { tableSync } = require("./src/utils/commonMethod");

require('./src/associations')

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", indexRouter);

app.listen(PORT, async () => {
  try {
    console.log("server is running on ", PORT);
    await sequelize.authenticate();
    console.log("Db connetion has been established successfully");
    await tableSync()
  } catch (error) {
    console.error("ERROR", error.message);
  }
});

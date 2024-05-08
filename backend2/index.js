const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const router = require("./routes/index");

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use(express.static(path.resolve(__dirname, 'static')));

app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      alter: true,
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
